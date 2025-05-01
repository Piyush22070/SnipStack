import MainContainer from '../component/MainContainer'
import AddSection from '../component/AddSection'
export default function Home(){
    return <div>
      <code className="flex justify-center mt-6 text-4xl font-bold">Code Snippet List</code>
      <div className="flex justify-center items-center ">
        <div className="w-full max-w-4xl p-4">
         <div className='h-[600px]'><MainContainer /></div> 
          <AddSection />
        </div>
      </div>  
    </div>
    
}