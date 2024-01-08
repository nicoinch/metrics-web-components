[
    { label: 'Vue3', url: 'http://localhost:4173/' },
    { label: 'Web components', url: 'http://localhost:4174/' },
].forEach(({ url, label }) => {
    describe(`Testing ${label}:`, () => {
        describe(`Metrics display`, () => {
            [
                { index: 0, initialValue: 3 },
                { index: 1, initialValue: 0 },
                { index: 2, initialValue: 1 },
            ].forEach((block) => {
                describe(`metrics block ${block.index + 1}`, () => {
                    it('should display initial value', () => {
                        cy.visit(url);
                        cy.get('[data-testid=display-value]').eq(block.index).should('have.text', block.initialValue);
                    });

                    it('should increment value when clicking on +', () => {
                        cy.visit(url);
                        cy.get('[data-testid=counter-increase-button]').eq(block.index).click();
                        cy.get('[data-testid=display-value]')
                            .eq(block.index)
                            .should('have.text', block.initialValue + 1);
                    });

                    it('should decrement value when clicking on -', () => {
                        cy.visit(url);
                        if (block.initialValue > 0) {
                            cy.get('[data-testid=counter-decrease-button]').eq(block.index).click();
                        }
                        cy.get('[data-testid=display-value]')
                            .eq(block.index)
                            .should('have.text', block.initialValue > 0 ? block.initialValue - 1 : 0);
                    });

                    it('should reset value to 0 when clicking on reset', () => {
                        cy.visit(url);
                        cy.get('[data-testid=counter-increase-button]').eq(block.index).click();
                        cy.get('[data-testid=control-pane-button]').eq(block.index).click();
                        cy.get('[data-testid=display-value]').eq(block.index).should('have.text', 0);
                    });

                    it('should disable + button when max is reached', () => {
                        cy.visit(url);
                        for (let i = 0; i < 6 - block.initialValue; i++) {
                            cy.get('[data-testid=counter-increase-button]').eq(block.index).click();
                        }
                        cy.get('[data-testid=display-value]').eq(block.index).should('have.text', 6);
                        cy.get('[data-testid=counter-increase-button]').eq(block.index).should('be.disabled');
                    });

                    it('should disable - button when min is reached', () => {
                        cy.visit(url);
                        for (let i = 0; i < block.initialValue; i++) {
                            cy.get('[data-testid=counter-decrease-button]').eq(block.index).click();
                        }
                        cy.get('[data-testid=display-value]').eq(block.index).should('have.text', 0);
                        cy.get('[data-testid=counter-decrease-button]').eq(block.index).should('be.disabled');
                    });

                    it('should increment value when clicking on + after a reset', () => {
                        cy.visit(url);
                        cy.get('[data-testid=counter-increase-button]').eq(block.index).click();
                        cy.get('[data-testid=counter-increase-button]').eq(block.index).click();
                        cy.get('[data-testid=counter-decrease-button]').eq(block.index).click();
                        cy.get('[data-testid=control-pane-button]').eq(block.index).click();
                        cy.get('[data-testid=counter-increase-button]').eq(block.index).click();
                        cy.get('[data-testid=counter-increase-button]').eq(block.index).click();
                        cy.get('[data-testid=display-value]').eq(block.index).should('have.text', 2);
                    });
                });
            });
        });

        describe(`Language switch`, () => {
            it('should display english by default', () => {
                cy.visit(url);
                cy.get('[data-testid=control-pane-button]').eq(0).should('have.text', 'Reset');
                cy.get('[data-testid=language-picker] span').eq(1).should('have.text', 'Basculer en Français');
            });

            it('should display french when clicking on picker', () => {
                cy.visit(url);
                cy.get('[data-testid=language-picker]').click();
                cy.get('[data-testid=control-pane-button]').eq(0).should('have.text', 'Réinitialiser');
                cy.get('[data-testid=language-picker] span').eq(1).should('have.text', 'Switch to English');
            });

            it('should display english back when clicking on picker', () => {
                cy.visit(url);
                cy.get('[data-testid=language-picker]').click();
                cy.get('[data-testid=language-picker]').click();
                cy.get('[data-testid=control-pane-button]').eq(0).should('have.text', 'Reset');
                cy.get('[data-testid=language-picker] span').eq(1).should('have.text', 'Basculer en Français');
            });
        });

        describe(`Dark mode switcher`, () => {
            it('should display dark mode by default', () => {
                cy.visit(url);
                cy.get('[data-testid=dark-mode-switcher-to-light]').should('be.not.hidden');
                cy.get('[data-testid=control-pane-button]').eq(0).should('have.css', 'color', 'rgb(245, 240, 255)');
            });

            it('should display light mode after clicking on switch', () => {
                cy.visit(url);
                cy.get('[data-testid=dark-mode-switcher-to-light]').click();
                cy.get('[data-testid=dark-mode-switcher-to-dark]').should('be.not.hidden');
                cy.get('[data-testid=control-pane-button]').eq(0).should('have.css', 'color', 'rgb(54, 0, 119)');
            });

            it('should display dark mode after switch twice mode', () => {
                cy.visit(url);
                cy.get('[data-testid=dark-mode-switcher-to-light]').click();
                cy.get('[data-testid=dark-mode-switcher-to-dark]').click();
                cy.get('[data-testid=dark-mode-switcher-to-light]').should('be.not.hidden');
                cy.get('[data-testid=control-pane-button]').eq(0).should('have.css', 'color', 'rgb(245, 240, 255)');
            });
        });
    });
});
