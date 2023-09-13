import { getUsers } from "../lib/user.service";
import Paginator from "../../../../index";

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const currentPage = parseInt(searchParams['page'] as string, 10) || 1
    const { data, meta } = await getUsers(currentPage)

    return (
        <div className="p-2">
            <h1 className="mb-2 font-bold">Pagination demo</h1>
            {data.map((user) => (
                <div key={user.id} className="py-2">
                    <div>{user.id} - {user.name} - {user.email}</div>
                </div>
            ))}

            <nav className="pt-6 text-sm">
                <Paginator path="/" currentPage={currentPage} totalPages={meta.pagination.totalPages}/>
            </nav>
        </div>
    )
}
