import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LinkedInConnections = () => {
  return (
    <div className="grow-your-linkedin-connections">
  <div className="container">
    <div className="grow-your-linkedin-connections-container">
      <div className="grow-your-linkedin-connections-header">
        <h3>Grow Your LinkedIn Connections</h3>
        <p>
          Build a profile that recruiters notice, share content that sparks
          engagement, and turn networking into real career opportunities.
        </p>
      </div>
      <div className="grow-your-linkedin-connections-content">
        <Image
          src="/img/linkdin.png"
          className="linkedin-icon"
          alt="linkedin-icon"
          width={903}
          height={396}
        />
        <Link
          className="grow-people-card left-card"
          href="https://www.linkedin.com/in/varunsoni09?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADcJ6iwBXaEcXPnjOZsa_kursR24tJZpe80&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BM9HPd%2FxcQpKDLJ4ycZ%2FGWQ%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/img/Varun Soni.jpg"
            alt="people-icon"
            width={200}
            height={200}
          />
          <p>33,000+</p>
        </Link>
        <Link
          className="grow-people-card bottom-left"
          href="https://www.linkedin.com/in/ca-shubham-pai?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACPBAu8BX63Y9QftOHkDtw1q8XQsrbjpqNY&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3Bmk1fSwP%2BRBCCH5%2BqvTYs2Q%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/img/Shubham Pai.jpg"
            alt="people-icon"
            width={399}
            height={400}
          />
          <p>31,000+</p>
        </Link>
        <Link
          className="grow-people-card top-left-card"
          href="https://www.linkedin.com/in/manan-jain-cbs?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADiJUzIBI0iCJmFIJI-wmtS9Rg0wlv4ZnKc&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BYemJcg8aT2ubONruFZ7Rsg%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>39,000+</p>
          <Image
            src="/img/Manan Jain.jpg"
            alt="people-icon"
            width={200}
            height={200}
          />
        </Link>
        <Link
          className="grow-people-card right-right-card"
          href="https://www.linkedin.com/in/faizannezami/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/img/Faizan Nezami.jpg"
            alt="people-icon"
            width={200}
            height={200}
          />
          <p>28,000+</p>
        </Link>
        <Link
          className="grow-people-card bottom-right-card"
          href="https://www.linkedin.com/in/paras-doda?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/img/Paras DodaC.jpg"
            alt="people-icon"
            width={200}
            height={200}
          />
          <p>29,000+</p>
        </Link>
      </div>
    </div>
  </div>
</div>

  )
}

export default LinkedInConnections
