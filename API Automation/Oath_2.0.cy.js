describe("Oath 2.0",()=>{

let accessToken=null;

it("Access Token",()=>{
    
cy.request({

method: "POST",
url: "https://github.com/login/oauth/access_token",
qs:{
client_id: 'Ov23lifnq41kJ3yWB6R4',
client_secret: '43cf7e9e8e9b5bed9cb19e4b684a452cb372ffbf',
code:'87b08705ba2301098b5e'

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