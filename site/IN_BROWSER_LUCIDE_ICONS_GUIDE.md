# Lucide Icons with In-Browser React

## Overview

This guide explains how to use Lucide icons in React applications running in the browser with Babel Standalone (no build step). Lucide is a modern icon library with 1000+ icons, and it works seamlessly with in-browser React when properly configured.

## Why Lucide?

- **Lightweight**: Only loads the icons you use
- **Modern**: Clean, consistent design system
- **Flexible**: Easy to size, color, and customize
- **Tree-shakeable**: When you eventually move to a build system

## Setup

### 1. Load Lucide via CDN

Add the Lucide UMD bundle to your HTML before Babel Standalone:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>React App with Lucide Icons</title>

    <!-- React -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

    <!-- Babel Standalone -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>

    <!-- Your components -->
    <script type="text/babel" data-type="module" data-plugins="transform-modules-umd" src="components/Icons.jsx"></script>
    <script type="text/babel" data-type="module" data-plugins="transform-modules-umd" src="components/App.jsx"></script>
</body>
</html>
```

**Important**: Load Lucide *after* React but *before* Babel Standalone so it's available when your components are transpiled.

### 2. Create an Icon Wrapper Component

Lucide exposes icons via `window.lucide`. Create a reusable wrapper component:

```javascript
// components/Icons.jsx

// Base Icon component that wraps Lucide icons
const Icon = ({ name, size = 20, className = '', ...props }) => {
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (ref.current && window.lucide) {
            // Create the icon element using Lucide's createElement
            const iconElement = window.lucide.createElement(window.lucide[name]);

            if (iconElement) {
                // Set size attributes
                iconElement.setAttribute('width', size);
                iconElement.setAttribute('height', size);

                // Clear any existing content and append the icon
                ref.current.innerHTML = '';
                ref.current.appendChild(iconElement);
            }
        }
    }, [name, size]); // Re-run if name or size changes

    return <span ref={ref} className={className} {...props} />;
};

// Export specific icons as named components
export const SearchIcon = (props) => <Icon name="Search" {...props} />;
export const XIcon = (props) => <Icon name="X" {...props} />;
export const MenuIcon = (props) => <Icon name="Menu" {...props} />;
export const HomeIcon = (props) => <Icon name="Home" {...props} />;
export const UserIcon = (props) => <Icon name="User" {...props} />;
export const SettingsIcon = (props) => <Icon name="Settings" {...props} />;

export default Icon;
```

### 3. Use Icons in Your Components

```javascript
// components/App.jsx
import { SearchIcon, MenuIcon, UserIcon } from './Icons.jsx';

const App = () => {
    return (
        <div>
            <header>
                <MenuIcon size={24} />
                <h1>My App</h1>
                <UserIcon size={20} className="user-icon" />
            </header>

            <div className="search-bar">
                <SearchIcon size={18} />
                <input type="text" placeholder="Search..." />
            </div>
        </div>
    );
};

export default App;
```

## How It Works

### The Lucide UMD Bundle

When you load Lucide via CDN, it creates a global `window.lucide` object containing:

- `createElement(iconDefinition)`: Function that creates an SVG element
- Icon definitions: `window.lucide.Search`, `window.lucide.Menu`, etc.

**Icon name format**: PascalCase (e.g., `Search`, `ChevronDown`, `AlertCircle`)

### The Wrapper Pattern

The `Icon` component uses:

1. **`useRef`**: Creates a reference to a DOM element
2. **`useEffect`**: Runs after render to inject the SVG
3. **`createElement`**: Lucide's function to build the SVG element
4. **Dynamic attributes**: Sets size on the created SVG

This pattern is necessary because Lucide generates raw SVG elements, not React components, in the UMD bundle.

## Common Icon Names

Here are commonly used Lucide icons (remember: PascalCase):

### Navigation
- `Menu`, `X` (close), `ChevronRight`, `ChevronDown`, `ArrowLeft`, `ArrowRight`

### Actions
- `Search`, `Plus`, `Minus`, `Edit`, `Trash2`, `Save`, `Download`, `Upload`

### UI
- `User`, `Settings`, `Bell`, `Mail`, `Calendar`, `Clock`, `Heart`, `Star`

### Files & Media
- `File`, `FileText`, `Folder`, `Image`, `Video`, `Music`

### Communication
- `MessageSquare`, `Send`, `Phone`, `Video`

### Status
- `Check`, `X`, `AlertCircle`, `AlertTriangle`, `Info`, `CheckCircle2`

### Social
- `Github`, `Twitter`, `Linkedin`, `Facebook`

Browse all icons: https://lucide.dev/icons/

## Styling Icons

### With CSS Classes

```javascript
<SearchIcon size={20} className="search-icon" />
```

```css
.search-icon {
    color: #2563eb;
    cursor: pointer;
}

.search-icon:hover {
    color: #1e40af;
}
```

### Inline Styles

```javascript
<MenuIcon size={24} style={{ color: 'blue', cursor: 'pointer' }} />
```

### With CSS Variables

```css
:root {
    --icon-color: #64748b;
    --icon-hover-color: #1e293b;
}

.icon {
    color: var(--icon-color);
    transition: color 0.2s;
}

.icon:hover {
    color: var(--icon-hover-color);
}
```

## Common Patterns

### 1. Button with Icon

```javascript
const Button = ({ icon: Icon, children, ...props }) => {
    return (
        <button className="btn" {...props}>
            {Icon && <Icon size={16} />}
            {children}
        </button>
    );
};

// Usage
<Button icon={SearchIcon}>Search</Button>
```

### 2. Icon-Only Button

```javascript
const IconButton = ({ icon: Icon, size = 20, label, ...props }) => {
    return (
        <button className="icon-btn" aria-label={label} {...props}>
            <Icon size={size} />
        </button>
    );
};

// Usage
<IconButton icon={MenuIcon} label="Open menu" onClick={toggleMenu} />
```

### 3. Conditional Icons

```javascript
const ToggleButton = ({ isOpen }) => {
    return (
        <button>
            {isOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </button>
    );
};
```

### 4. Icon with Text

Use CSS Flexbox for alignment:

```javascript
<div className="flex-row">
    <UserIcon size={18} />
    <span>John Doe</span>
</div>
```

```css
.flex-row {
    display: flex;
    align-items: center;
    gap: 8px;
}
```

## Best Practices

### 1. Export Only Icons You Use

Don't export all icons in `Icons.jsx` - only the ones your app needs. This keeps your component clean:

```javascript
// Good: Only export what you need
export const SearchIcon = (props) => <Icon name="Search" {...props} />;
export const MenuIcon = (props) => <Icon name="Menu" {...props} />;

// Avoid: Exporting everything
// export const Icon1 = ...
// export const Icon2 = ...
// (100 more exports)
```

### 2. Use Semantic Sizes

Define standard sizes as constants:

```javascript
const ICON_SIZES = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32
};

<SearchIcon size={ICON_SIZES.md} />
```

### 3. Add Proper Accessibility

Always include `aria-label` for icon-only buttons:

```javascript
<button aria-label="Close dialog">
    <XIcon size={20} />
</button>
```

### 4. Handle Missing Icons Gracefully

Add error handling to the Icon component:

```javascript
const Icon = ({ name, size = 20, className = '', ...props }) => {
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (ref.current && window.lucide) {
            const iconDef = window.lucide[name];

            if (!iconDef) {
                console.error(`Icon "${name}" not found in Lucide`);
                return;
            }

            const iconElement = window.lucide.createElement(iconDef);
            if (iconElement) {
                iconElement.setAttribute('width', size);
                iconElement.setAttribute('height', size);
                ref.current.innerHTML = '';
                ref.current.appendChild(iconElement);
            }
        }
    }, [name, size]);

    return <span ref={ref} className={className} {...props} />;
};
```

### 5. Consistent Spacing

Use CSS gaps for icon-text spacing:

```css
.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem; /* Consistent spacing */
}
```

## Troubleshooting

### Icons Not Appearing

**Problem**: Icons don't show up at all

**Solutions**:
1. Check browser console for errors
2. Verify Lucide CDN is loaded: `console.log(window.lucide)`
3. Ensure Icons.jsx is loaded before components that use it
4. Check icon name is correct (PascalCase, no typos)

### Wrong Icon Displayed

**Problem**: Different icon appears than expected

**Solution**: Verify icon name matches Lucide's naming convention:
- ✅ `AlertCircle` (correct)
- ❌ `alert-circle` (wrong)
- ❌ `alertCircle` (wrong)

### Icons Not Updating

**Problem**: Icon doesn't change when props change

**Solution**: Ensure `name` and `size` are in the `useEffect` dependency array:

```javascript
React.useEffect(() => {
    // ... icon creation code
}, [name, size]); // ✅ Include dependencies
```

### Size Not Working

**Problem**: `size` prop has no effect

**Solution**: Check that attributes are set on the icon element, not the wrapper span:

```javascript
// Correct: Set on iconElement
iconElement.setAttribute('width', size);
iconElement.setAttribute('height', size);
```

### Styling Not Applied

**Problem**: CSS colors/styles don't apply to icon

**Solution**: Icons inherit text color. Use `color` (not `fill`):

```css
.my-icon {
    color: blue; /* ✅ Works */
    fill: blue;  /* ❌ Doesn't work */
}
```

## Performance Considerations

### Icon Creation Overhead

Each icon creates an SVG element in a `useEffect`. For many icons:

- **Minimal impact**: < 100 icons
- **Noticeable**: 100-500 icons
- **Problematic**: > 500 icons simultaneously

For icon-heavy UIs, consider:
1. Virtualizing lists with icons
2. Lazy loading sections
3. Eventually moving to a build system with tree-shaking

### Re-renders

The Icon component re-creates the SVG on every re-render if dependencies change. To optimize:

```javascript
// Memoize icon components
const MemoizedSearchIcon = React.memo(SearchIcon);
```

## Migration to Build System

When moving to Vite/Create React App/Next.js:

### Before (In-Browser)
```javascript
import { SearchIcon } from './Icons.jsx';
<SearchIcon size={20} />
```

### After (Build System)
```javascript
import { Search } from 'lucide-react';
<Search size={20} />
```

Benefits of build system:
- Tree-shaking (smaller bundle)
- Native React components (better performance)
- TypeScript support

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Lucide Icons Example</title>
    <style>
        .icon-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border: none;
            background: #2563eb;
            color: white;
            border-radius: 4px;
            cursor: pointer;
        }
        .icon-btn:hover {
            background: #1e40af;
        }
    </style>

    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const Icon = ({ name, size = 20, className = '', ...props }) => {
            const ref = React.useRef(null);

            React.useEffect(() => {
                if (ref.current && window.lucide) {
                    const iconElement = window.lucide.createElement(window.lucide[name]);
                    if (iconElement) {
                        iconElement.setAttribute('width', size);
                        iconElement.setAttribute('height', size);
                        ref.current.innerHTML = '';
                        ref.current.appendChild(iconElement);
                    }
                }
            }, [name, size]);

            return <span ref={ref} className={className} {...props} />;
        };

        const SearchIcon = (props) => <Icon name="Search" {...props} />;
        const HeartIcon = (props) => <Icon name="Heart" {...props} />;

        const App = () => {
            return (
                <div>
                    <button className="icon-btn">
                        <SearchIcon size={16} />
                        Search
                    </button>
                    <button className="icon-btn">
                        <HeartIcon size={16} />
                        Favorite
                    </button>
                </div>
            );
        };

        ReactDOM.createRoot(document.getElementById('root')).render(<App />);
    </script>
</body>
</html>
```

## Summary

- Load Lucide UMD bundle via CDN
- Create an Icon wrapper component using `useRef` and `useEffect`
- Export specific icon components from your Icons.jsx
- Use PascalCase for icon names
- Icons inherit CSS `color` property
- Include icons in UMD transform module loading order

Lucide icons work seamlessly with in-browser React when you follow the wrapper component pattern. This approach gives you access to 1000+ professional icons without any build tools, and the same component structure works when you eventually migrate to a build system.
