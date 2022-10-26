import Head from 'next/head'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import Showcase from '@/components/Showcase'
import EventItem from '@/components/EventItem'

export default function EventsPage({ events }) {
  ///this will run on client side
  console.log(events)
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to Showcase</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  )
}
//getServerSideProps() this fetch data on each load like use effect
//getStaticProps() will fetch data one time and before build and then build will run
// to fetch data when data is has been changed
// we use revalidate: 1 seconds if it doesnt find it will make request again only if the data has changed
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()
  //this console.log will run on server side
  console.log(events)
  return {
    props: { events },
    revalidate: 1,
  }
}
