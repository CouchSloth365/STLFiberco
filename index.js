document.addEventListener(`DOMContentLoaded`, () => {
    const regions = document.querySelectorAll(`.regions`);
    const wrapper = document.querySelector(`.external`);
    const cycleDuration = 25000; 
    const elementDuration = 5000;
    const main = document.querySelector(`.main`)
    let fadeElementsPaused = false
    let fadeElementsTimeout = []

    wrapper.style.opacity =`0`

    wrapper.addEventListener(`click`, (event) => {
        const pointer = event.target

        if(pointer.id === `start`){
            forStartButton()
        }

        if(pointer.id === `next`){
            forNextButton()
        }

        if(pointer.id === `prevtwo`){
            forPrevButton()
        }

        if(pointer.id === `home`){
            forHomeButton()
        }

        if(pointer.id === `nexttwo`){
            forNextTwo()
        } 

        if(pointer.id === `prevthree`){
            forPrevThree()
        }

        if(pointer.id === 'getstarted'){
            forSpecifics()
        }
    })

    function pauseFadeElements(){
        fadeElementsPaused = true
        fadeElementsTimeout.forEach(id => clearTimeout(id))
        fadeElementsTimeout = []
        console.log(`fadeElements Paused.`)
    }

    function resumeFadeElements(){
        if(!fadeElementsPaused) return
        fadeElementsPaused = false
        console.log(`fadeElements Resumed.`)
        fadeElements();
    }

    function fadeElements() {
        if(fadeElementsPaused) return

        regions.forEach((element, index) => {
            const startTime = index * elementDuration;
    
            const fadeInId = setTimeout(() => {
                if(!fadeElementsPaused){
                    console.log(`Element ${index} fades in at ${startTime}ms`);
                    element.classList.add(`visible`)
                }
            }, startTime)
            fadeElementsTimeout.push(fadeInId)

            const fadeOutId = setTimeout(() => {
                if(!fadeElementsPaused){
                    console.log(`Element ${index} fades out at ${startTime + elementDuration}ms`);    
                    element.classList.remove(`visible`)
                }
            }, startTime + elementDuration)
            fadeElementsTimeout.push(fadeOutId)
        });
    
        setTimeout(fadeElements, cycleDuration);
    }
    
    fadeElements();

    function forNextButton(){
        const next = document.getElementById(`next`)
        if(next){
            const mailbox = document.querySelector(`.container`)
            
            if(mailbox){
                mailbox.style.transition = `opacity 0.3s ease-in-out`
                mailbox.style.opacity = `0`
            }

            setTimeout(() => {
                fetch(`./plans.html`)
                    .then(response => response.text())
                    .then(html => {
                        const parser = new DOMParser()
                        const externalDoc1 = parser.parseFromString(html,`text/html`)
                        const plans = externalDoc1.querySelector(`.wrapper`)
                       
                        if(plans && wrapper){
                            plans.style.opacity = `0`
                            wrapper.innerHTML = ``
                            wrapper.appendChild(plans)
                            setTimeout(() => {
                                plans.style.opacity = `1`
                                saveBandwithSelections()
                            }, 100)
                        }
                    })
            }, 500)
        }                       
    }

    function forPrevButton(){
        const prevTwo = document.getElementById(`prevtwo`)
        const wrapper = document.querySelector(`.external`)
        
        if(prevTwo){
            const plansContainer = document.querySelector(`.wrapper`)

            if(plansContainer){
                plansContainer.style.transition = `opacity 0.3s ease-in-out`
                plansContainer.style.opacity = `0`
            }
        
            setTimeout(() => {
                fetch(`./getstarted.html`)
                    .then(response => response.text())
                    .then(html => {
                        const parser = new DOMParser()
                        const externalDoc2 = parser.parseFromString(html,`text/html`)
                        const email = externalDoc2.querySelector(`.container`)
                        
                        if(email){
                            email.style.opacity = `0`
                            wrapper.innerHTML = ``
                            wrapper.appendChild(email)
                            setTimeout(() => {
                                email.style.opacity = `1`
                                saveEmailInput()
                            }, 100)
                        }
                    }) 
                    .catch(error => console.error(`Error loading 'getstarted.html':`, error))
            }, 300)
        }
    }

    function forHomeButton(){
        const homeBtn = document.getElementById(`home`)
    
        if(homeBtn){
            wrapper.style.opacity = `0`
            wrapper.style.zIndex = `-1`
            setTimeout(() => {
                main.style.zIndex = `1`
                main.style.opacity = `1`
            }, 500)
            setTimeout(() => {
                regions.forEach((region) => {
                    region.style.opacity = ``
                    region.style.zIndex = ``
                })
                resumeFadeElements()
            }, 500);
        }
    }

    function loadExternalHTML(){
        fetch(`./getstarted.html`)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const externalDoc = parser.parseFromString(html, `text/html`);
                const email = externalDoc.querySelector(`.container`);
    
                if(email){
                    wrapper.innerHTML = ``;
                    wrapper.appendChild(email);
                    saveEmailInput()
                }else{
                    console.log(`Error: "container" class does not exist in './getstarted.html' `)
                }
            })
    }

    function forNextTwo(){
        const nextTwo = document.getElementById(`nexttwo`)

        if(nextTwo){
            const plansContainer = document.querySelector(`.wrapper`)

            if(plansContainer){
                plansContainer.style.transition = `opacity 0.3s ease-in-out`
                plansContainer.style.opacity = `0`
            }

            setTimeout(() => {
                fetch(`./specifics.html`)
                    .then(response => response.text())
                    .then(html => {
                        const parser = new DOMParser()
                        const externalDoc3 = parser.parseFromString(html, `text/html`)
                        const specs = externalDoc3.querySelector(`.spec`)
    
                        if(specs){
                            wrapper.innerHTML = ``
                            specs.style.transition = `opacity 0.3s ease-in-out`
                            specs.style.opacity = `0`
                            wrapper.appendChild(specs)
                            setTimeout(() => {
                                specs.style.opacity =`1`
                            }, 300)
                        }
                    })
            }, 300);
        }
    }

    let selectedButtons = []

    function forPrevThree(){
        const prevThree = document.getElementById(`prevthree`)

        if(prevThree){
            const specs = document.querySelector(`.spec`)

            selectedButtons.length = []

            if(specs){
                specs.style.transition = `opacity 0.3s ease-in-out`
                specs.style.opacity = `0`
            }

            setTimeout(() => {
                fetch(`./plans.html`)
                    .then(response => response.text())
                    .then(html => {
                        const parser = new DOMParser()
                        const externalDoc4 = parser.parseFromString(html, `text/html`)
                        const plans = externalDoc4.querySelector(`.wrapper`)
    
                        wrapper.innerHTML = ``
                        plans.style.transition = `opacity 0.3s ease-in-out`
                        plans.style.opacity = `0`
                        wrapper.appendChild(plans)
                        setTimeout(() => {
                            plans.style.opacity = `1`
                            saveBandwithSelections()
                            toggleNextTwo()
                        }, 300);
                    })
            }, 300);
        }
    }

    function forStartButton(regions, main, wrapper){
        const start = document.getElementById(`start`)
        if(start){
            const body = document.querySelector('.body')
            start.addEventListener(`click`, () => {
                regions.forEach(regions => {
                    regions.style.opacity = `0`
                });

                main.style.opacity = `0`
                main.style.zIndex = `-1`

                setTimeout(() => {
                    body.style.transition = 'opacity 0.2s ease-in-out'
                    body.style.opacity = '0'
                }, 300);

                wrapper.style.transition = 'opacity 0.5s ease-in-out'
                wrapper.style.opacity = '0'

                setTimeout(() => {
                    wrapper.innerHTML = ''
                }, 400);

                setTimeout(() => {
                    if(wrapper){
                        wrapper.style.opacity = `1`
                        wrapper.style.zIndex = `1`
                    }
                }, 400)

                setTimeout( () => {
                    loadExternalHTML();
                }, 500)
                saveEmailInput()
            })

        }else{
            console.log(`Error: The class/ID "start" doesn't exist`);
        }

    }

    forStartButton(regions, main, wrapper);
    
    let emailInput = []
    let userInput = []

    function saveEmailInput(){
        const next = document.getElementById('next')
        const form = document.getElementById('form')
        const user = document.querySelector('.username')
        const input = document.querySelector('.email__text')

        if(next && form && user && input){
            next.disabled = true

            const inputCheck = () => {
                const isValid = input.checkValidity() && user.checkValidity()
                const isNotEmpty = input.value.trim() !== '' && user.value.trim() !== ''
                return isValid && isNotEmpty
            }
            
            const completedCheck = () => {
                if(!inputCheck()){
                    next.disabled = true
                    next.classList.remove('active')
                } else {
                    next.disabled = false
                    next.classList.add('active')
                }

                const conditions = () => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/; 
                    const isEmailValid = emailRegex.test(input.value.trim())
                    const isUserInputValid = !userInput.includes(user.value.trim()) && inputCheck()
                    return isEmailValid && isUserInputValid
                }

                if(conditions()){
                    emailInput.push(input.value.trim())
                    userInput.push(user.value)
                    console.log(emailInput)
                    console.log(userInput)
                }
            }

            user.addEventListener('input', (completedCheck))
            input.addEventListener('input', (completedCheck))
            
        }
    }

    function toggleNextTwo() {
        const nextTwo = document.getElementById('nexttwo');
        if (nextTwo) {
            if (selectedButtons.length === 0) {
                nextTwo.disabled = true;
                nextTwo.classList.remove('active');
            } else {
                nextTwo.disabled = false;
                nextTwo.classList.add('active');
            }
        }
    }

    function saveBandwithSelections(){
        const buttons = document.querySelectorAll('.plans')
        const checkbox = document.getElementById('multiplans')
        const nextTwo = document.getElementById('nexttwo')
        if(buttons && nextTwo){
            nextTwo.disabled = true
        } 

        buttons.forEach((button) => {
            button.addEventListener('click', () => {

                if (!checkbox.checked) {
                    buttons.forEach((btn) => {
                        if (btn !== button) {
                            btn.classList.remove('active');
                        }
                    });
                    selectedButtons = [];
                }

                button.classList.toggle('active')
                const speed = button.querySelector('h1').textContent.trim();
                const unit = button.querySelector('span').textContent.trim();
                const mainText = `${speed} ${unit}`;

                if(button.classList.contains('active')){
                    selectedButtons.push(mainText)
                } else {
                    selectedButtons = selectedButtons.filter(btn => btn !==  mainText)
                }
                console.log(selectedButtons)
                toggleNextTwo()
            })

            checkbox.addEventListener('change', () => {
                if (!checkbox.checked) {
                    if (selectedButtons.length > 1) {
                        const lastSelected = selectedButtons.pop(); 
                        buttons.forEach((btn) => {
                            if (btn !== lastSelected) {
                                btn.classList.remove('active');
                            }
                        });
                        selectedButtons = [lastSelected];
                    }
                    toggleNextTwo()
                    console.log(selectedButtons)
                }
            });
        })      
        toggleNextTwo()
    }
    
    let specifics = []
    let timer

    function forSpecifics(){
        const specs = document.getElementById('specifics')
        const inSpecs = () => {
            if(specs){
                clearTimeout(timer)
                timer = setTimeout(() => {
                    specifics.push(specs.value)
                    console.log(specifics)
                }, 1000)
            }
         
        }

        if (specs.value.trim() === '' && !specifics.includes('None')){
            specifics.push('None')
        }

        specs.addEventListener('input', (inSpecs))

        const completeData = {
            username: userInput.join(','),
            email: emailInput.join(','),
            subscriptions: selectedButtons.join(','),
            specifics: specifics.join(',')
        };
    
        console.log(userInput, emailInput, selectedButtons, specifics);

        const webhookURL = 'https://hook.eu2.make.com/ssfzm4lptiaatu0okukeemigpuq8eduv'
    
        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(completeData)
        })
        .then(response => response.text())
        .then(data => {
    
            if(data.message == 'Docs contains ' + emailInput){
                console.warn('The Email provided already exists')
            }else if (data.message == 'Sheets contains' + emailInput){
                console.warn('The E-Mail provided already exists')
            }
    
            if (data.error) {
                console.log('Response: ', data)
                console.error('Error:', data.error);
                console.log('Error submitting data: ' + data.error);
            } else {
                console.log('Success:', data);
                console.log('Your data has been submitted successfully!');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            console.log('An error occurred while submitting the data.');
        });
    }

    function forLogoButton(){
        const logoButton = document.getElementById('logobutton')
        logoButton.addEventListener('click', () => {
            wrapper.style.opacity = '0'
            wrapper.style.zIndex = '-1'

            setTimeout(() => {
                regions.forEach((region) => {
                    region.style.opacity = ``
                    region.style.zIndex = ``
                })
                resumeFadeElements()
                main.style.opacity = '1'
                main.style.zIndex = '1'

                wrapper.innerHTML = ''
            }, 500)
            forStartButton()

        })
    }

    forLogoButton()


    function forSubs(regions, main, wrapper) {
        const subs = document.getElementById('sbs');
        if (subs) {
            subs.addEventListener('click', (event) => {
                event.preventDefault()

                const isSubs = wrapper.querySelector('.body')
                if(isSubs){
                    console.log('The page has already been loaded')
                    return
                }

                regions.forEach(region => {
                    region.style.opacity = '0';
                });
    
                main.style.opacity = '1';
                main.style.zIndex = '2';
    
                wrapper.style.opacity = '0';
    
                setTimeout(() => {
                    fetch('./subs.html')
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const externalDoc6 = parser.parseFromString(html, 'text/html');
                            const body = externalDoc6.querySelector('.body');
    
                            if (body) {
                                wrapper.innerHTML = '';
                                wrapper.style.opacity = '0';
    
                                wrapper.appendChild(body);
    
                                setTimeout(() => {
                                    wrapper.style.opacity = '1';
                                    wrapper.style.zIndex = '1';
                                }, 100);
                            } else {
                                console.error('Error: .about element not found in subs.html');
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching subs.html:', error);
                        });
                }, 500);
            });
        } else {
            console.error('Error: The element with ID "sbs" does not exist');
        }
    }
    forSubs(regions, main, wrapper)


    function forAboutUs(regions, main, wrapper) {
        const abt = document.getElementById('abt');
        if (abt) {
            abt.addEventListener('click', (event) => {
                event.preventDefault()

                const isAbout = wrapper.querySelector('.about')

                if(isAbout){
                    console.log('The page has already been loaded')
                    return
                }

                regions.forEach(region => {
                    region.style.opacity = '0';
                });
    
                main.style.opacity = '1';
                main.style.zIndex = '2';
    
                wrapper.style.opacity = '0';
    
                setTimeout(() => {
                    fetch('./aboutus.html')
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const externalDoc6 = parser.parseFromString(html, 'text/html');
                            const about = externalDoc6.querySelector('.about');
    
                            if (about) {
                                wrapper.innerHTML = '';
                                wrapper.style.opacity = '0';
    
                                wrapper.appendChild(about);
    
                                setTimeout(() => {
                                    wrapper.style.opacity = '1';
                                    wrapper.style.zIndex = '1';
                                }, 100);
                            } else {
                                console.error('Error: .about element not found in aboutus.html');
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching aboutus.html:', error);
                        });
                }, 500);
            });
        } else {
            console.error('Error: The element with ID "abt" does not exist');
        }
    }
    forAboutUs(regions, main, wrapper)
})
