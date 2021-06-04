package main

import (
	"fmt"
	"log"
	"net/http"

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

	// iterate through all the stocks
	for i, s := range allStock {
		fmt.Println(i, s)
		results += 10
	}

	return results, nil
}

func AddStock(stock Stock) error {

	allStock = append(allStock, stock)

	fmt.Printf("len=%d cap=%d %v\n", len(allStock), cap(allStock), allStock)

	return nil
}

func main() {
	log.Println("Starting Main")
	// create a router with a default configuration
	r := gin.Default()
	// endpoint to retrieve all posted bulletins
	r.GET("/getDividend", func(context *gin.Context) {
		results, err := GetDividend()
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"status": "internal error: " + err.Error()})
			return
		}
		context.JSON(http.StatusOK, results)
	})
	// endpoint to create a new bulletin
	r.POST("/addStock", func(context *gin.Context) {
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
