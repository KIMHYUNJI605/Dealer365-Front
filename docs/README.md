# Dealer365 Documentation

## Icon Rule (Mandatory for AI & Developers)
All Lucide icons must be rendered ONLY through `components/d365/atoms/icon.tsx`.
Direct JSX rendering of lucide icons is strictly forbidden in this project.

### Forbidden:
- Direct JSX rendering like `<Search />` or `<SearchIcon />`
- Direct class-based sizing like `h-4 w-4`, `h-5 w-5` on Lucide icons
- Direct `strokeWidth` overrides in page or screen code

### Allowed:
- `import { Search } from "lucide-react"`
- `<Icon icon={Search} />`
- `<Icon icon={FileText} className="mr-2" />`

---
*Refer to the main README in the root for more design system rules.*
