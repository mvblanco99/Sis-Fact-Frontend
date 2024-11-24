import { Sidebar } from 'flowbite-react'
import { Link } from 'react-router-dom'

const ItemCollapse = ({icon, label, urls}) => {
  return (
    <Sidebar.Collapse icon={icon} label={label} >
        {
            urls.map((e,i) => {
                return <Link to={e.url} key={i+1}><Sidebar.Item>{e.name}</Sidebar.Item></Link>
            })
        }
    </Sidebar.Collapse>
  )
}

export default ItemCollapse