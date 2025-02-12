document.addEventListener(`DOMContentLoaded`, () => {
    const regions = document.querySelectorAll(`.regions`);
    const start = document.getElementById(`start`);
    const wrapper = document.querySelector(`.external`);
    const cycleDuration = 25000; 
    const elementDuration = 5000;
    const main = document.querySelector(`.main`)
    const nextTwo = document.getElementById(`nexttwo`)
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

    function forPrevThree(){
        const prevThree = document.getElementById(`prevthree`)

        if(prevThree){
            const specs = document.querySelector(`.spec`)

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
                        }, 300);
                    })
            }, 300);
        }
    }

    function forStartButton(regions, main, wrapper){
        const start = document.getElementById(`start`)
        if(start){
            start.addEventListener(`click`, () => {
                regions.forEach(regions => {
                    regions.style.opacity = `0`
                });

                    main.style.opacity = `0`
                    main.style.zIndex = `-1`

                setTimeout(() => {
                    if(wrapper){
                        wrapper.style.opacity = `1`
                        wrapper.style.zIndex = `1`
                    }
                }, 400)

                setTimeout( () => {
                    loadExternalHTML();
                }, 500)
            })

        }else{
            console.log(`Error: The class/ID "start" doesn't exist`);
        }

    }

    forStartButton(regions, main, wrapper);
    
})
