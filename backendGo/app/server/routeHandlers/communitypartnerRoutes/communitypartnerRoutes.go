package communitypartnerRoutes

import (
	"context"
	"fmt"
	"net/http"
	"xavier_portal/models/communitypartner"
	"xavier_portal/models/communitypartneruser"

	"github.com/gin-gonic/gin"
)

// Create
// path('attempt_communityPartner_register',
//      views.attempt_communityPartner_register, name='attempt_communityPartner_register'),

func AttemptCommunityPartnerRegister(c *gin.Context) {

	// ctx := context.TODO()

	type body struct {
		PartnerID    int64
		PartnerEmail string
		PartnerTitle string
		Password     string
	}
	bod := new(body)

	c.Bind(bod)
	comp := communitypartner.CommunityPartner{}
	comp.PartnerEmail = bod.PartnerEmail
	comp.PartnerTitle = bod.PartnerTitle
	comp.ID = bod.PartnerID
	fmt.Println(comp, bod)
	communitypartneruser.CommunityPartnerUserStore.Register(context.TODO(), &comp, bod.Password)
	c.JSON(http.StatusOK,
		comp,
	)
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
