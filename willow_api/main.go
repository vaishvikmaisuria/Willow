package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"io/ioutil"
)

// stock struct for addStock body
type StockBody struct {
	Symbol   string `json:"symbol" binding:"required"`
	Price    string `json:"price" binding:"required"`
	Quantity string `json:"quantity" binding:"required"`
}

// Stock struct for main info about stocks 
type Stock struct {
	Symbol   string `json:"symbol" binding:"required"`
	Price    string `json:"price" binding:"required"`
	Quantity string `json:"quantity" binding:"required"`
	DividendPerShare string `json:"dividendPerShare"`
	Industry                   string `json:"Industry"`
	PERatio                    string `json:"PERatio"`
	PEGRatio                   string `json:"PEGRatio"`
	BookValue                  string `json:"BookValue"`
	Eps                        string `json:"EPS"`
	RevenuePerShareTTM         string `json:"RevenuePerShareTTM"`
	ProfitMargin               string `json:"ProfitMargin"`
	AnalystTargetPrice         string `json:"AnalystTargetPrice"`
	DividendDate               string `json:"DividendDate"`
	ExDividendDate             string `json:"ExDividendDate"`
}

// All Stocks
var allStock []Stock

type StockInfo struct {
	Symbol                     string `json:"Symbol"`
	AssetType                  string `json:"AssetType"`
	Name                       string `json:"Name"`
	Description                string `json:"Description"`
	Cik                        string `json:"CIK"`
	Exchange                   string `json:"Exchange"`
	Currency                   string `json:"Currency"`
	Country                    string `json:"Country"`
	Sector                     string `json:"Sector"`
	Industry                   string `json:"Industry"`
	Address                    string `json:"Address"`
	FiscalYearEnd              string `json:"FiscalYearEnd"`
	LatestQuarter              string `json:"LatestQuarter"`
	MarketCapitalization       string `json:"MarketCapitalization"`
	Ebitda                     string `json:"EBITDA"`
	PERatio                    string `json:"PERatio"`
	PEGRatio                   string `json:"PEGRatio"`
	BookValue                  string `json:"BookValue"`
	DividendPerShare           string `json:"DividendPerShare"`
	DividendYield              string `json:"DividendYield"`
	Eps                        string `json:"EPS"`
	RevenuePerShareTTM         string `json:"RevenuePerShareTTM"`
	ProfitMargin               string `json:"ProfitMargin"`
	OperatingMarginTTM         string `json:"OperatingMarginTTM"`
	ReturnOnAssetsTTM          string `json:"ReturnOnAssetsTTM"`
	ReturnOnEquityTTM          string `json:"ReturnOnEquityTTM"`
	RevenueTTM                 string `json:"RevenueTTM"`
	GrossProfitTTM             string `json:"GrossProfitTTM"`
	DilutedEPSTTM              string `json:"DilutedEPSTTM"`
	QuarterlyEarningsGrowthYOY string `json:"QuarterlyEarningsGrowthYOY"`
	QuarterlyRevenueGrowthYOY  string `json:"QuarterlyRevenueGrowthYOY"`
	AnalystTargetPrice         string `json:"AnalystTargetPrice"`
	TrailingPE                 string `json:"TrailingPE"`
	ForwardPE                  string `json:"ForwardPE"`
	PriceToSalesRatioTTM       string `json:"PriceToSalesRatioTTM"`
	PriceToBookRatio           string `json:"PriceToBookRatio"`
	EVToRevenue                string `json:"EVToRevenue"`
	EVToEBITDA                 string `json:"EVToEBITDA"`
	Beta                       string `json:"Beta"`
	Five2WeekHigh              string `json:"52WeekHigh"`
	Five2WeekLow               string `json:"52WeekLow"`
	Five0DayMovingAverage      string `json:"50DayMovingAverage"`
	Two00DayMovingAverage      string `json:"200DayMovingAverage"`
	SharesOutstanding          string `json:"SharesOutstanding"`
	SharesFloat                string `json:"SharesFloat"`
	SharesShort                string `json:"SharesShort"`
	SharesShortPriorMonth      string `json:"SharesShortPriorMonth"`
	ShortRatio                 string `json:"ShortRatio"`
	ShortPercentOutstanding    string `json:"ShortPercentOutstanding"`
	ShortPercentFloat          string `json:"ShortPercentFloat"`
	PercentInsiders            string `json:"PercentInsiders"`
	PercentInstitutions        string `json:"PercentInstitutions"`
	ForwardAnnualDividendRate  string `json:"ForwardAnnualDividendRate"`
	ForwardAnnualDividendYield string `json:"ForwardAnnualDividendYield"`
	PayoutRatio                string `json:"PayoutRatio"`
	DividendDate               string `json:"DividendDate"`
	ExDividendDate             string `json:"ExDividendDate"`
	LastSplitFactor            string `json:"LastSplitFactor"`
	LastSplitDate              string `json:"LastSplitDate"`
}

func getStockInfo(stockSymbol string) (StockInfo, error) {
	
	domain := "https://www.alphavantage.co/query?function=OVERVIEW&symbol="
	apikey := "&apikey=I949JH30PZ3WERAU"
	endpoint := domain + stockSymbol + apikey

	response, err := http.Get(endpoint)
	if err != nil {
        fmt.Print(err.Error())
        os.Exit(1)
    }

	responseData, err := ioutil.ReadAll(response.Body)
    if err != nil {
        log.Fatal(err)
    }

	var responseObject StockInfo
    json.Unmarshal(responseData, &responseObject)

	return responseObject, nil
} 


func GetDividendTotal() (float64, error) {
	results := 0.00
	for i := 0; i < len(allStock); i++ {
		dividendPerShare, err1 := strconv.ParseFloat(allStock[i].DividendPerShare, 64)
		quantityOfStock, err2 := strconv.ParseFloat(allStock[i].Quantity, 64)
		if err1 != nil || err2 != nil {
			// handle error
			fmt.Println(err1)
			fmt.Println(err2)
			os.Exit(2)
		}
		log.Println(dividendPerShare)
		log.Println(quantityOfStock)
		log.Println("Working")
		results += dividendPerShare * quantityOfStock
		log.Println(results)
	}
	fmt.Println(results)
	return results, nil
}

func AddStock(stockbody StockBody) error {

	responseObject, err := getStockInfo(stockbody.Symbol)
	
	if err != nil {
        fmt.Print(err.Error())
        os.Exit(1)
    }

	var finalStock Stock

	finalStock.Symbol  =  stockbody.Symbol
	finalStock.Price    = stockbody.Price
	finalStock.Quantity = stockbody.Quantity
	finalStock.DividendPerShare = responseObject.DividendPerShare
	finalStock.Industry         = responseObject.Industry
	finalStock.PERatio          = responseObject.PERatio
	finalStock.PEGRatio         = responseObject.PEGRatio   
	finalStock.BookValue        = responseObject.BookValue
	finalStock.Eps                   = responseObject.Eps
	finalStock.RevenuePerShareTTM    = responseObject.RevenuePerShareTTM
	finalStock.ProfitMargin          = responseObject.ProfitMargin
	finalStock.AnalystTargetPrice    = responseObject.AnalystTargetPrice
	finalStock.DividendDate          = responseObject.DividendDate
	finalStock.ExDividendDate        = responseObject.ExDividendDate

	allStock = append(allStock, finalStock)

	fmt.Printf("len=%d cap=%d %v\n", len(allStock), cap(allStock), allStock)
	log.Println(len(allStock))
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

	// endpoint to retrieve "Hello World"
	r.GET("/", func(context *gin.Context) {
		results := "Hello World"
		context.JSON(http.StatusOK, results)
	})

	// endpoint to retrieve all posted bulletins
	r.GET("/getDividendTotal/", func(context *gin.Context) {
		results, err := GetDividendTotal()
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"status": "internal error: " + err.Error()})
			return
		}
		context.JSON(http.StatusOK, results)
	})

	// endpoint to create a new bulletin
	r.POST("/addStock/", func(context *gin.Context) {
		var b StockBody
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
	if err := r.Run(":5000"); err != nil {
		panic(err)
	}
}
