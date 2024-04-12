export const backgroundImageRenderer = (imageUrl, hasGradient = false, fullScreenHeight = false) => {
    const gradient = 'radial-gradient(rgb(0 0 0 / 50%), rgb(1 1 1 / 50%)),'
    return {
        backgroundImage: `${hasGradient ? gradient : ''} url(${imageUrl}) `,
        ...(fullScreenHeight && { minHeight: '100vh' })
    }
}

export const cardBackgroundImageRenderer = (imageUrl, hasGradient = false) => {
    const gradient = 'linear-gradient( to right bottom,rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5))'
    return { backgroundImage: `${hasGradient ? gradient : ''} ,url("${imageUrl}") ` }
}

