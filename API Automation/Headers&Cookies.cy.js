describe("API Testing",()=>{

let authToken=null;

before("Creating a token",()=>{

cy.request({

method: 'POST',
url: "https://simple-books-api.glitch.me/api-clients",
headers: 
{

'Content-type': 'application/json'

},

body: {

"clientName": "Jatt",
"clientEmail": Math.random().toString(5).substring(2)+"@test.com"
    
}

}).then((response)=>{

authToken=response.body.accessToken;

})

})

it("Create an Order",()=>{

cy.request({

method: "POST",
url: "https://simple-books-api.glitch.me/orders/",
headers: {

'Content-Type': 'application/json',
'Authorization': 'Bearer '+authToken

},

body: {

bookId: 1,
customerName: "Nagni"

}

}).then((response)=>{

    ////authToken=response.body.accessToken;
    expect(response.status).to.eq(201)
    expect(response.body.created).to.eq(true)
    
    })

})

it("Fetch the orders",()=>{

cy.request({

method: "GET",
url: "https://simple-books-api.glitch.me/orders",
headers: {

'content-type': 'application/json',
'Authorization': 'Bearer '+authToken

},

cookies: {

    'cookieName': "mycookie"

}

}).then((response)=>{

expect(response.status).to.eq(200)
expect(response.body).has.length(1)

})

})

})