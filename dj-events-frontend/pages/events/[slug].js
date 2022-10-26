import React from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import Link from 'next/link'
import Image from 'next/Image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'

export default function EventPage({ evt }) {
  const deleteEvent = (e) => {
    console.log('delete')
  }
  const router = useRouter()
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image} width={960} height={600} />
          </div>
        )}
        <h3>Peformers:</h3>
        <p>{evt.performers}</p>
        <h3>Description</h3>
        <p>{evt.desciption}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()
  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }))
  return {
    paths,
    ///fallback: false means it will show 404 if slug is not found
    /// to look for path even if does generate at build time
    fallback: true,
  }
}

//params: slug comes from getStaticPaths
export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`)
  const events = await res.json()
  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  }
}

// ///{slug} desctructure slug from query
// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json()
//   return {
//     props: {
//       evt: events[0],
//     },
//   }
// }
