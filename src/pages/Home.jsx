import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

const Home = () => {

    const [commissions, setCommissions] = useState([])

    useEffect(()=>{
        axios.get('https://cheshire-youth-server.onrender.com/api/commission').then(({data})=>{
            setCommissions(data.commissions)
        })
    }, [])

    return (
        <>
        {commissions.map(commission => {
            return <Link to={commission.commission} key={commission.commission_id}>
                <h1>{commission.commission}</h1>
            </Link>
        })}
        </>
    )
}

export default Home