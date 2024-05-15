import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProjectById } from '@/api/ProjectAPI'
import EditProjectForm from '@/components/projects/EditProjectForm'

const EditProjectView = () => {

    const params = useParams()
    const projectId = params.projectId! /* ! is used to tell typescript that this value will never be null*/

    const {data, isLoading, isError} = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        retry: false

      })

      if(isLoading) return 'Cargando...'
      if(isError) return <Navigate to='/404' />

      if(data) return <EditProjectForm data={data} projectId={projectId} /> 

  
}

export default EditProjectView
