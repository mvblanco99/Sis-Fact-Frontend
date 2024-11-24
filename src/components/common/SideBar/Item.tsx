import { Sidebar } from 'flowbite-react'
import { Link } from 'react-router-dom'

const Item = ({icon,name,url}) => {
  return (
      url.map(e => {
        return <Link to={e.url}>
          <Sidebar.Item icon={icon}>
            {name}
          </Sidebar.Item>
        </Link>
      })
    
    
  )
}

export default Item