import basePage from "./basePage"

class myPage extends basePage {
    inputTextBox(textBoxId,inputText) {
        cy.get('[id='+textBoxId+']').type(inputText);
        cy.wait(1000);
    }

    clickButton(buttonId){
        cy.get('[id='+buttonId+']').click();
        cy.wait(1000);
    }

    checkResult(resultText){
        cy.get('[id=result]').should("contain", resultText);
        cy.wait(1000);
    }

}

export default myPage