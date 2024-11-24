import { Sidebar } from 'flowbite-react'
import { Link } from 'react-router-dom'

const Item = ({icon,name,url}) => {
  return (
      url.map((e,i) => {
        return <Link to={e.url} key={e+1}>
          <Sidebar.Item icon={icon}>
            {name}
          </Sidebar.Item>
        </Link>
      })
    
    
  )
}

export default Item