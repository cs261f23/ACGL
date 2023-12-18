package CommunityPartnerModels

type AttemptCommunityPartnerRegisterRequest struct {
	PartnerID    int64
	PartnerEmail string
	PartnerTitle string
	Password     string
}
