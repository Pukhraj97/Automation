describe("Oath 2.0",()=>{

let accessToken=null;

it("Access Token",()=>{
    
cy.request({

method: "POST",
url: "https://github.com/login/oauth/access_token",
qs:{
client_id: Cypress.env('GITHUB_CLIENT_ID'),
client_secret: Cypress.env('GITHUB_CLIENT_SECRET'),
code: Cypress.env('GITHUB_OAUTH_CODE')

}
}).then((response)=>{
    

    const params=response.body.split('&')
    accessToken=params[0].split("=")[1]
    console.log(accessToken)

})    
    
})

it("GET Request",()=>{

cy.request({

method: "GET",
url: "https://api.github.com/user/repos",
headers:{
Authorization:"Bearer "+accessToken

}

}).then((response)=>{

expect(response.status).to.eq(200)
expect(response.body[0].id).to.eq(817631010)

})


})

})