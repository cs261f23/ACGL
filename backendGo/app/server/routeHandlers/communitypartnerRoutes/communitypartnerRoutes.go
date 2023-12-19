package communitypartnerRoutes

import (
	"context"
	"fmt"
	"net/http"
	"xavier_portal/models/communitypartner"
	"xavier_portal/models/communitypartneruser"
	CommunityPartnerModels "xavier_portal/server/routeHandlers/requestModels/communitypartner"

	"github.com/gin-gonic/gin"
)

// Create
// path('attempt_communityPartner_register',
//      views.attempt_communityPartner_register, name='attempt_communityPartner_register'),

func AttemptCommunityPartnerRegister(c *gin.Context) {

	// ctx := context.TODO()

	body := new(CommunityPartnerModels.AttemptCommunityPartnerRegisterRequest)

	comp := communitypartner.CommunityPartner{}
	func() {
		c.Bind(body)
		comp.PartnerEmail = body.PartnerEmail
		comp.PartnerTitle = body.PartnerTitle
		comp.ID = body.PartnerID
		fmt.Println(comp, body)
		communitypartneruser.CommunityPartnerUserStore.Register(context.TODO(), &comp, body.Password)
		c.JSON(http.StatusOK,
			comp,
		)
		return
	}()

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
