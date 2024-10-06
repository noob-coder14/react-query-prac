import axios from "axios"
import { useQuery } from "react-query"

const fetchHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

const onSuccess = () => {
  console.log('Data fetched successfully!')
}

const onError = () => {
  console.log('Something went wrong!')
}

export const RQSuperHeroesPage = () => {
  const {isLoading,data,isError, error, isFetching, refetch} = useQuery('super-heroes',fetchHeroes,{
    // cacheTime:5*60000,
    // staleTime: 10000,
    enabled: false,
    onSuccess,
    onError,
    //12
    select: (data) => {
      const superHeroNames = data.data.map((hero)=> hero.name)
      return superHeroNames
    }
  })
  // console.log(isLoading,isFetching)
  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if(isError){
    return <h2>{error.message}</h2>
  }
  console.log('d',data)
  return (
    <>
      <h2>Super Heroes Page</h2>
      <button onClick={refetch}>Call Heroes</button>
      {/* {data?.data.map(hero => {
        return <div>{hero.name}</div>
      })} */}

      {/* 12 */}
      {data?.map((name)=> { return <div key={name}>{name}</div>})}
    </>
  )
}
