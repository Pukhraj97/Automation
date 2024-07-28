
const { expect } = require('chai');
const { before } = require('mocha');
const xml2js = require ('xml2js')
const parser = new xml2js.Parser({explicitArray: false})

describe("XML Parsing",()=>{

const xmlPayload="<pet><id>10</id><name>doggie</name><category><id>1</id><name>Dogs</name></category><photoUrls><photoUrl>string</photoUrl></photoUrls><tags><tag><id>0</id><name>string</name></tag></tags><status>available</status></pet>"
let petID=null;

before("Create a Pet",()=>{
cy.request({

method: "POST",    
url: "https://petstore3.swagger.io/api/v3/pet",
body: xmlPayload,
Headers: {

'Content-Type': 'application/xml',
'Accept': "application/xml",
// 'client_id': 'test',
// 'api_key' : 'test'

}

}).then((response)=>{

expect(response.status).to.eq(200)
parser.parseString(response.body,(err,result)=>{
petID=result.petID

})

})


})

it("Fetch a Pet",()=>{
    cy.request({
    
    method: "GET",    
    url: "https://petstore3.swagger.io/api/v3/pet"+petID,
    body: xmlPayload,
    Headers: {
    
    'Content-Type': 'application/xml',
    // 'Accept': "application/xml",
    // 'client_id': 'test',
    // 'api_key' : 'test'
    
    }
    
    }).then((response)=>{
    
    expect(response.status).to.eq(200)
    parser.parseString(response.body,(err,result)=>{
    expect(result.petID.id).to.eq('doggie')
    })
    
    })
    
    
    })

})