describe('Task Manager [Dashboard Page]:', () => {
  it('Visits the Task manager listing page and look for some content', () => {
    cy.visit('/tasks');
    cy.contains('Sort');
  })

  it('Should open Add Task modal and close it on click of Cancel', () => {
    cy.visit('/tasks');
    cy.get('button').contains('ADD TASK').click({ multiple: true });
    cy.get('button').contains('Cancel').click({ multiple: true });
  })

  it('Should sort tasks by proirity', () => {
    cy.visit('/tasks');
    cy.get('button').contains('Sort by Priority').click({ multiple: true });
  });

  it('Should sort tasks by due date', () => {
    cy.visit('/tasks');
    cy.get('button').contains('Sort by Due Date').click({ multiple: true });
  })
});
