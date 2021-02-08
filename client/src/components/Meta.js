import Helmet from 'react-helmet'

const Meta = ({title, description, keyword, ico}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keyword' content={keyword}/>
            <link rel="icon" type='image/png' href={ico}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome To UA-Systems-4U',
    content: 'The best selection of professional grade best drones in the industry',
    keywords: 'drones, aerial, photography, professional',
    ico: "%PUBLIC_URL%/drone.ico"
}

export default Meta