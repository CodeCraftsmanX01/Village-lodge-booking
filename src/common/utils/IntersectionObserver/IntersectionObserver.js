const options = {}

const intersectionObserverMiddle = (entries, observer) => {
  entries.forEach(element => {
    if (element.isIntersecting) {
      element.target.classList.add('fadeInUp')
      element.target.classList.remove('middle')
    }
  })
}

const intersectionObserverLeft = (entries, observer) => {
  entries.forEach(element => {
    if (element.isIntersecting) {
      element.target.classList.add('fadeInLeft')
      element.target.classList.remove('leftSide')
    }
    // else {
    //   element.target.classList.remove('fadeInLeft')
    //   element.target.classList.add('leftSide')
    // }
  })
}

const intersectionObserverRight = (entries, observer) => {
  entries.forEach(element => {
    if (element.isIntersecting) {
      element.target.classList.add('fadeInRight')
      element.target.classList.remove('rightSide')
    }
    // else {
    //   element.target.classList.remove('fadeInRight')
    //   element.target.classList.add('rightSide')
    // }
  })
}

const intersectionObserverCustom = (entries, observer) => {
  entries.forEach(element => {
    if (element.isIntersecting) {
      element.target.classList.add('anim-toRight')
      element.target.classList.remove('customSection')
    }
    // else {
    //   element.target.classList.remove('fadeInRight')
    //   element.target.classList.add('rightSide')
    // }
  })
}

export const events = () => {
  const observerMiddle = new IntersectionObserver(intersectionObserverMiddle, options)
  const observerLeft = new IntersectionObserver(intersectionObserverLeft, options)
  const observerRight = new IntersectionObserver(intersectionObserverRight, options)
  const observeCustom = new IntersectionObserver(intersectionObserverCustom, options)

  const middleSection = document.querySelectorAll('.middle')
  const leftSection = document.querySelectorAll('.leftSide')
  const rightSection = document.querySelectorAll('.rightSide')
  const customSection = document.querySelectorAll('.customSection')
  
  middleSection.forEach(section => {
    observerMiddle.observe(section)
  })
  leftSection.forEach(section => {
    observerLeft.observe(section)
  })
  rightSection.forEach(section => {
    observerRight.observe(section)
  })
  customSection.forEach(section => {
    observeCustom.observe(section)
  })
}