package main

// Review describes basic details of Review
type Review struct {
	ReviewID        string `json:"reviewID"`
	Product         string `json:"product"`
	Content         string `json:"content"`
	UserID          string `json:"userID"`
	ServiceProvider string `json:"serviceProvider"`
	Rating          int    `json:"rating,omitempty"`
	UpvoteCount     int    `json:"upvoteCount,omitempty"`
	ReportCount     int    `json:"reportCount,omitempty"`
	CreatedBy       string `json:"createdBy"`
	UpdatedBy       string `json:"updatedBy,omitempty"`
	Cts             string `json:"cts"`
	Uts             string `json:"uts,omitempty"`
}
