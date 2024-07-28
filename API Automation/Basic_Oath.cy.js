
describe("Authentication",()=>{

it("Basic Auth",()=>{

cy.request({

method: 'GET',
url: " https://postman-echo.com/basic-auth",
auth: {

    user: 'postman',
    pass: 'password'

}

}).then((response)=>{

expect(response.status).to.eq(200)
expect(response.body.authenticated).to.eq(true)

})

})

it("Digest Auth",()=>{

    cy.request({
    
    method: 'GET',
    url: " https://postman-echo.com/basic-auth",
    auth: {
    
        user: 'postman',
        pass: 'password',
        method: 'digest'
    
    }
    
    }).then((response)=>{
    
    expect(response.status).to.eq(200)
    expect(response.body.authenticated).to.eq(true)
    
    })
    
    })

    const token ='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'
it('Bearer Token',()=>{

    cy.request({

    method: "GET",
    url: "https://api.github.com/user/repos",
    headers:{

        Authorization:'Bearer '+token

    }

    }).then((response)=>{
    
    expect(response.status).to.be.equal(200)

    })

})

it("API key Authentication",()=>{

cy.request({

method: "GET",
url: "https://api.openweathermap.org/data/2.5/weather?lat=25&lon=70&appid=790b3c90fdfa81234e101b1c91e209d6",

qs:{
appid: '790b3c90fdfa81234e101b1c91e209d6'
}

}).then((response)=>{

    expect(response.status).to.eq(200)

})



})
})