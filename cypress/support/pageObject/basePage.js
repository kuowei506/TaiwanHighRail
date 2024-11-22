class basePage {
  navigate(url="") {
    if(url.length===0){
      cy.visit("/");
    }else{
      cy.visit(url);
    }
    cy.wait(2000);
  }

  getPageTitle() {
    return cy.title();
  }

  checkPageTitle(title) {
    cy.get('h1.page-title').then(($el) => {
      expect($el).to.contain(title);
    })
  }

  clearTestData(contractNo, companyId) {
    let apigw = Cypress.env('apigw');
    cy.clearWriteoffData(contractNo, companyId, apigw);
  }
}

export default basePage;
