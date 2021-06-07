package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
)

// stock
type Stock struct {
	Symbol   string `json:"symbol" binding:"required"`
	Price    string `json:"price" binding:"required"`
	Quantity string `json:"quantity" binding:"required"`
}

// All Stocks
var allStock []Stock

func GetDividend() (int, error) {
	results := 0
	for i := 0; i < len(allStock); i++ {
		price, err := strconv.Atoi(allStock[i].Price)
		if err != nil {
			// handle error
			fmt.Println(err)
			os.Exit(2)
		}
		results += price
	}

	return results, nil
}

func AddStock(stock Stock) error {

	allStock = append(allStock, stock)

	fmt.Printf("len=%d cap=%d %v\n", len(allStock), cap(allStock), allStock)

	return nil
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	log.Println("Starting Main")
	// create a router with a default configuration
	r := gin.Default()

	r.Use(CORSMiddleware())

	// endpoint to retrieve all posted bulletins
	r.GET("/getDividend/", func(context *gin.Context) {
		results, err := GetDividend()
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"status": "internal error: " + err.Error()})
			return
		}
		context.JSON(http.StatusOK, results)
	})
	// endpoint to create a new bulletin
	r.POST("/addStock/", func(context *gin.Context) {
		var b Stock
		// reading the request's body & parsing the json
		if context.Bind(&b) == nil {
			if err := AddStock(b); err != nil {
				context.JSON(http.StatusInternalServerError, gin.H{"status": "internal error: " + err.Error()})
				return
			}
			context.JSON(http.StatusOK, gin.H{"status": "ok"})
			return
		}
		// if binding was not successful, return an error
		context.JSON(http.StatusUnprocessableEntity, gin.H{"status": "invalid body"})
	})
	// running the http server
	log.Println("running..")
	if err := r.Run(":8080"); err != nil {
		panic(err)
	}
}
