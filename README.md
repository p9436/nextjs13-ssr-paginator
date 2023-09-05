# Next.js Server Side Rendering Paginator

A pagination component for Next.js applications that supports server-side rendering (SSR).

## Installation

You can install the package using npm:

```bash
npm install github:p9436/nextjs13-ssr-paginator
```

## Usage

To use the Paginator component in your Next.js application, follow these steps:

1. Import the Paginator component:

```javascript
import Paginator from 'nextjs13-ssr-paginator';
```

2. Place the Paginator component in your component's render:


```tsx
export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const currentPage = parseInt(searchParams['page'] as string, 10) || 1
    const { data, meta } = await getData(currentPage) // 

    return (
        <main>
            {data.map((user) => (
                <div key={user.id}>
                    <div>{user.accountId} - {user.email}</div>
                </div>
            ))}

            <nav className="pt-6">
                <Paginator path="/admin/users" currentPage={currentPage} totalPages={meta.totalPages}/>
            </nav>
        </main>
    )
}
```

Here is an example with a full list of available properties:

```tsx
// const urlParams = { q: 'image', in: 'actions' } 
<Paginator
  path="/your-route"         // The base path for pagination links
  currentPage={1}            // The current active page number
  totalPages={10}            // The total number of pages
  params={ urlParams }       // (Optional) Url params, will be conwerted to /your-route?q=image&in=actions
  maxVisiblePages={5}        // (Optional) The maximum number of visible pages
  buttonLabelPrevious="Prev" // (Optional) Label for the "Previous" button
  buttonLabelNext="Next"     // (Optional) Label for the "Next" button
  styleClassGeneral="..."    // (Optional) CSS class for general styling
  styleClassLeft="..."       // (Optional) CSS class for left buttons (e.g., Prev)
  styleClassRight="..."      // (Optional) CSS class for right buttons (e.g., Next)
  styleClassActive="..."     // (Optional) CSS class for active page number
  styleClassInactive="..."   // (Optional) CSS class for inactive page numbers
  styleClassDisabled="..."   // (Optional) CSS class for disabled buttons
/>
```

## Styling

This component is based on Tailwind CSS by default. However, you can easily customize the styling by redefining your own style classes for various elements.

For example, to redefine the general styling, left buttons, and right buttons, you can set the `styleClassGeneral`, `styleClassLeft`, and `styleClassRight` props accordingly.

## Props

- `path`: The base path for pagination links.
- `currentPage`: The current active page number.
- `totalPages`: The total number of pages.
- `params` (optional): URL params.
- `maxVisiblePages` (optional): The maximum number of visible pages (default: 5).
- `buttonLabelPrevious` (optional): Label for the "Previous" button (default: "Previous").
- `buttonLabelNext` (optional): Label for the "Next" button (default: "Next").
- `styleClassGeneral` (optional): CSS class for general styling.
- `styleClassLeft` (optional): CSS class for left buttons (e.g., Prev).
- `styleClassRight` (optional): CSS class for right buttons (e.g., Next).
- `styleClassActive` (optional): CSS class for active page number.
- `styleClassInactive` (optional): CSS class for inactive page numbers.
- `styleClassDisabled` (optional): CSS class for disabled buttons.

## License

This package is distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

If you encounter any issues or have questions, feel free to [open an issue](https://github.com/your-username/nextjs13-ssr-paginator/issues) on the GitHub repository.
