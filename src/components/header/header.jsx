import React from 'react'
import { Container, Logo, LogoutBtn } from "../index"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "All posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "Add post",
      path: "/add-post",
      active: authStatus,
    }
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'><Logo width='70px' /></Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </Link>
                </li>
              ) : null
            )}

          </ul>
          {authStatus && <li><LogoutBtn /></li>}
        </nav>
      </Container>
    </header>
  )
}

export default Header
// jo HTML element repeat hota hai vahan par keys lagate hain
// router mein kahin par navigate karne ke liye
// For (link and navlink) use to="path"
// For (useNavigate) use navigate("path")