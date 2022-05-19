package main

import (
	"encoding/json"
	"fmt"
	"github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
	"log"
)

// ReviewContract provides functions for recording Reviews of products
type ReviewContract struct {
	contractapi.Contract
}

func main() {

	ReviewChaincode, err := contractapi.NewChaincode(&ReviewContract{})
	if err != nil {
		log.Panicf("Error creating ReviewChaincode: %v", err)
	}

	fmt.Println("ReviewChaincode:", ReviewChaincode)
	if err := ReviewChaincode.Start(); err != nil {
		log.Panicf("Error starting ReviewChaincode: %v", err)
	}

}

// CreateReview is used to create Reviews for a product
func (n *ReviewContract) CreateReview(ctx contractapi.TransactionContextInterface, ReviewID string, Product string, Content string, UserID string,
	ServiceProvider string,Rating int, CreatedBy string, Uts string, Cts string) error {

	if ReviewID == "" {
		return fmt.Errorf("CreateReview : Mandatory parameter missing: ReviewID")

	}

	if Product == "" {
		return fmt.Errorf("CreateReview : Mandatory parameter missing: Product")

	}

	if UserID == "" {
		return fmt.Errorf("CreateReview : Mandatory parameter missing: UserID")

	}

	if Content == "" {
		return fmt.Errorf("CreateReview : Mandatory parameter missing: Content")

	}

	if ServiceProvider == "" {
		return fmt.Errorf("CreateReview : Mandatory parameter missing: ServiceProvider")

	}

	if CreatedBy == "" {
		return fmt.Errorf("CreateReview : Mandatory parameter missing: CreatedBy")

	}

	if Uts == "" {
		return fmt.Errorf("CreateReview : Mandatory parameter missing: Uts")

	}

	if Cts == "" {
		return fmt.Errorf("CreateReview : Mandatory parameter missing: Cts")

	}

	if Rating <=0 {
		return fmt.Errorf("CreateReview : Mandatory parameter missing: Rating")

	}


	objReview := Review{ReviewID: ReviewID, Product: Product, UserID: UserID, ServiceProvider : ServiceProvider, Rating : Rating, Content: Content, CreatedBy: CreatedBy, Uts: Uts, Cts: Cts}
	ReviewJSON, err := json.Marshal(objReview)
	if err != nil {
		return err
	}

	err = ctx.GetStub().PutState(ReviewID, ReviewJSON)
	if err != nil {
		return fmt.Errorf("CreateReview : failed to put to world state for product Review %v %v", ReviewID, err)
	}

	return nil

}

// UpdateReview is used to update Reviews for a product
func (n *ReviewContract) UpdateReview(ctx contractapi.TransactionContextInterface, reviewID string, content string, upvoteFlag bool, reportFlag bool, uts string) error {

	if reviewID == "" {
		return fmt.Errorf("UpdateReview : Mandatory parameter missing: reviewID")

	}

	if uts == "" {
		return fmt.Errorf("UpdateReview : Mandatory parameter missing: uts")

	}

	if content == "" && upvoteFlag == false && reportFlag == false {
		return fmt.Errorf("UpdateReview : Atleast one parameter must be provided for update - content,upvote or report")

	}

	reviewAsBytes, err := ctx.GetStub().GetState(reviewID)
	if err != nil {
		return fmt.Errorf("UpdateReview : failed to get world state for product Review %v %v", reviewID, err)
	} else if reviewAsBytes == nil {
		return fmt.Errorf("UpdateReview : Review does not exist %v", reviewID)
	}

	review := Review{}
	err = json.Unmarshal(reviewAsBytes, &review)

	if err != nil {
		return fmt.Errorf("UpdateReview : Error while unmarshal " + err.Error())
	}

	if len(content) > 0 {
		review.Content = content
	}

	if upvoteFlag == true {
		review.UpvoteCount = review.UpvoteCount + 1
	}

	if reportFlag == true {
		review.ReportCount = review.ReportCount + 1
	}

	review.Uts = uts

	ReviewJSON, err := json.Marshal(review)
	if err != nil {
		return err
	}

	err = ctx.GetStub().PutState(reviewID, ReviewJSON)
	if err != nil {
		return fmt.Errorf("CreateReview : failed to put to world state for product Review %v %v", reviewID, err)
	}

	return nil

}

// QueryReview uses a query string to perform a query for assets.
// Query string matching state database syntax is passed in and executed as is.
// Supports ad hoc queries that can be defined at runtime by the client.
// Only available on state databases that support rich query (e.g. CouchDB)
func (n *ReviewContract) QueryReview(ctx contractapi.TransactionContextInterface, queryString string) ([]*Review, error) {
	return getQueryResultForQueryString(ctx, queryString)
}

// getQueryResultForQueryString executes the passed in query string.
// The result set is built and returned as a byte array containing the JSON results.
func getQueryResultForQueryString(ctx contractapi.TransactionContextInterface, queryString string) ([]*Review, error) {
	resultsIterator, err := ctx.GetStub().GetQueryResult(queryString)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	return constructQueryResponseFromIterator(resultsIterator)
}

// constructQueryResponseFromIterator constructs a slice of assets from the resultsIterator
func constructQueryResponseFromIterator(resultsIterator shim.StateQueryIteratorInterface) ([]*Review, error) {
	var reviews []*Review
	for resultsIterator.HasNext() {
		queryResult, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		var review Review
		err = json.Unmarshal(queryResult.Value, &review)
		if err != nil {
			return nil, err
		}
		reviews = append(reviews, &review)
	}

	return reviews, nil
}
