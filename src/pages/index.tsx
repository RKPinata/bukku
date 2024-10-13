import { NextPage } from "next"
import { Layout } from "@components/Layout"
import { TransactionsPage } from "@components/experiences/TransactionsPage"

const Home: NextPage = () => {
  return (
    <Layout>
      <TransactionsPage></TransactionsPage>
    </Layout>
  )
}

export default Home