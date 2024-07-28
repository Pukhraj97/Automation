describe("Post BODY request methods",()=>{

it("Hard coded JSON object",()=>{

const bodyRequest={

    name: "Gareth",
    job: "Footballer"

}

cy.request({

    method: "POST",
    url: "https://reqres.in/api/users",
    body: bodyRequest

}).then((response) =>{
    
    expect(response.status).to.eq(201)
    expect(response.body.name).to.eq('Gareth')
    expect(response.body.job).to.eq('Footballer')

})

})

it("Dynamically generate JSON object",()=>{

const bodyRequest={

name: Math.random().toString(5).substring(2),
job: Math.random().toString(5).substring(2)

}

cy.request({

    method: "POST",
    url: "https://reqres.in/api/users",
    body: bodyRequest

}).then((response) =>{
    
    expect(response.status).to.eq(201)
    expect(response.body.name).to.eq(bodyRequest.name)
    expect(response.body.job).to.eq(bodyRequest.job)

})
    
})

it("Using Fixtures to call JSON objects",()=>{

cy.fixture('Reqres').then((myfixture)=>{
const bodyRequest=myfixture;

cy.request({

    method: "POST",
    url: "https://reqres.in/api/users",
    body: bodyRequest

}).then((response) =>{
    
    expect(response.status).to.eq(201)
    expect(response.body.name).to.eq(bodyRequest.name)
    expect(response.body.job).to.eq(bodyRequest.job)
    expect(response.body).has.property('name',bodyRequest.name)
    expect(response.body).has.property('job',bodyRequest.job)
})

})

})

})