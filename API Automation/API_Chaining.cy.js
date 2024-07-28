describe("API chaining",()=>{

it("Getting all the posts",()=>{

    cy.request({

        method: 'GET',
        url: "https://jsonplaceholder.typicode.com/posts"
        
        }).then((response)=>{
        
        expect(response.status).to.eq(200)
        const postID=response.body[1].id
        return postID
        
        }).then((postID)=>{
        
        cy.request({
        
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/comments?postId='+postID+''
        
        }).then((response=>{
        
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length(5)
        
        }))
        
        })
        
        })


})

