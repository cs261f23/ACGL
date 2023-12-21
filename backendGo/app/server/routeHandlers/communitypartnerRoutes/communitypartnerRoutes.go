package communitypartnerRoutes

import (
	"context"
	"net/http"
	"xavier_portal/models"
	CommunityPartnerModels "xavier_portal/server/routeHandlers/requestModels/communitypartner"

	"github.com/gin-gonic/gin"
)

// Create
// path('attempt_communityPartner_register',
//      views.attempt_communityPartner_register, name='attempt_communityPartner_register'),

/*
Attempts to register as a community partner user
*/
func AttemptCommunityPartnerRegister(c *gin.Context) {

	// ctx := context.TODO()

	body := new(CommunityPartnerModels.AttemptCommunityPartnerRegisterRequest)
	c.Bind(body)
	models.CommunityPartnerUserStore.Register(context.TODO(), body)
	c.JSON(http.StatusOK,
		body,
	)

}

func GetOpportunitiesByPartnerID(c *gin.Context) {
}

func GetOpportunityInfo(c *gin.Context) {

}

func CreateOpportunity(c *gin.Context) {

}
func EditOpportunity(c *gin.Context) {

}

func DeleteOpportunity(c *gin.Context) {

}

// path('get_communityPartners_by_opportunity', views.get_communityPartners_by_opportunity,
//      name='communityPartners_by_opportunity'),
// path('create_opportunity', views.create_opportunity, name='create_opportunity'),
// path('get_opportunities_by_partner_id',
//      views.get_opportunities_by_partner_id, name='get_opportunities_by_partner_id'),
// path('attempt_partner_register',
//      views.attempt_partner_register, name='attempt_partner_register'),
// path('get_opportunity_info', views.get_opportunity_info,
//      name='get_opportunity_info'),
// path('edit_opportunity', views.edit_opportunity,
//      name='views.edit_opportunity'),
// path('delete_opportunity', views.delete_opportunity,
//      name='views.delete_opportunity'),
