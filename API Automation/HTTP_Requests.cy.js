describe("HTTP Request",()=>{

    it("Get Call",()=>{

    cy.request("GET", "https://reqres.in/api/users").its('status').should('equal',200);

    })

    it("Post Call",()=>{

    ////cy.request("Post", "https://reqres.in/api/users").its('status').should('equal',201);
    cy.request({
        
    method: 'POST',
    url: "https://reqres.in/api/users",
    body: 
        {
            name: "Gareth",
            job: "Footballer"
        }

    }).its('status').should('equal',201);

    })

    it("PUT Call",()=>{

    cy.request({

    method: "PUT",
    url: "https://reqres.in/api/users/2",
    body: 
        
        {
            name: "morpheus",
            job: "zion resident"
        }

    }).its('status').should('equal', 200)

    })

    it("DEL Call",()=>{

    cy.request("DELETE","https://reqres.in/api/users/2").its('status').should('equal',204);

    })

})