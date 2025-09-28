
# FocusUI

FocusUI is a new type of web interface that allows users to focus on the most important content and immediate actions of the moment while minimizing distractions and clutter. It is designed to be simple, intuitive, and easy to use. It is built on top of the latest web technologies and is compatible with all modern browsers.

## Design Philosophy

The entire interface follows a left-to-right user journey approach (this can be adjusted later): on the left hand side there are all the input streams, on the right hand side there are all the output streams, and in the middle there is the main focus area.

There are no menus, the interaction is taking place in the middle section, based on the actual content that's being displayed.

## Live Implementation Screenshots

### Current Working Interface

FocusUI has been implemented with a beautiful glass morphism design and advanced drawer system.

#### Base Interface with Glass Effects

![FocusUI base interface with glass morphism effects](public/images/screenshots/FocusUI-demo-1280x720-closed.png)

Clean, minimalist interface featuring glass morphism drawers with backdrop blur effects and subtle transparency.

#### Expanded Primary Drawer with Social Media Icons

![Expanded left drawer showing social media navigation](public/images/screenshots/FocusUI-demo-1280x720-expanded.png)

Left drawer expanded showing social media icons with consistent glass styling and smooth animations.

#### Dual Drawer System - Primary and Secondary Navigation

![Both primary and secondary drawers active showing layered navigation](public/images/screenshots/FocusUI-demo-1280x720-expanded.png)

Advanced dual drawer system with proper z-index layering, where the secondary drawer provides additional navigation options while maintaining visual hierarchy.

## Concept Evolution

The design concepts in the `concepts/` folder demonstrate a systematic exploration of drawer-based navigation layouts.

### Basic Layout Concepts (001-006)

- **Concept 001**: Left sidebar/drawer in collapsed state
- **Concept 002**: Right sidebar/drawer in collapsed state  
- **Concept 003**: Dual drawers (left + right) simultaneously
- **Concept 004**: Three-panel layout (left + right + top)
- **Concept 005**: Four-panel layout (left + right + top + bottom)
- **Concept 006**: Expanded left drawer demonstration

As the content from the various sources gets streamed, their relevance and importance are calculated.

Only the most important sources are displayed in the second, extended drawer.

![Concept 010](public/images/screenshots/FocusUI-concept-012-important-icons-with-shadow.png)

### Functional Implementation (010)

The final concepts show actual functionality with populated sidebars:

- **010-incoming-sources-expanded**: Fully populated left sidebar (aka "primary drawer") featuring various application icons for communication and productivity tools
- **010-incoming-sources-expanded-importance**: Same layout with visual priority indicators using color coding (orange/red gradient) to highlight important sources

### Key Design Principles

- **Focus-oriented interface**: Keeps main workspace clean and uncluttered
- **Modular drawer system**: Collapsible panels organize different input/output sources
- **Visual hierarchy**: Color coding for importance and categorization
- **Progressive disclosure**: Panels can be added incrementally based on user needs

### Implementation Phases

#### Phase 1: Core Layout

- Implement basic drawer system (left, right, top, bottom)
- Add responsive behavior and animations
- Create theme system for consistent styling

#### Phase 2: Content Integration

- Add icon/source management system
- Implement priority/importance indicators
- Create drag-and-drop functionality for organizing sources

#### Phase 3: Advanced Features

- Add keyboard shortcuts and accessibility features
- Implement user preferences and state persistence
- Add real-time updates and notifications

#### Phase 4: Polish & Performance

- Optimize bundle size and loading performance
- Add advanced animations and micro-interactions
- Implement comprehensive testing suite

## Intellectual Property & Concept Origin

**Original Concept**: FocusUI concept and design philosophy created by **András Kora**

**Timestamped Proof**: This concept has been officially timestamped and certified through EU TSA (Trusted Service Authority) on **December 13, 2020 at 13:53:42 UTC**, providing cryptographic proof of the original creation date and authorship.

**Certificate Details**:

- EU TSA Certificate ID: `1d4b78b7f3d3-44ce-9f4e-1f9d6507d6d2`
- Project ID: `85de744b-f2ed-4da7-810b-124bc0924d04`
- Registration Authority: Cryptolog International
- Status: CONFIRMED

The core ideas, design patterns, and implementation approach documented in this repository represent original intellectual property with verifiable timestamp certification predating similar concepts in the industry.

© 2025 Andras Kora / FocusUI. All rights reserved.

---

Website: [FocusUI.io](https://focusui.io)

![Astro](https://img.shields.io/badge/astro-4.16.9-orange?style=flat&logo=astro&logoColor=orange)
![TypeScript](https://img.shields.io/badge/typescript-5.6.3-blue?style=flat&logo=typescript)
![Tailwind](https://img.shields.io/badge/tailwind-3.4.14-cyan?style=flat&logo=tailwindcss)

### Key Features

- **🎨 Visual Hierarchy**: High-importance elements in red zone → low-importance in blue zone
- **🗂️ Multi-Drawer System**: Simultaneous drawer operations with intelligent relationships
- **📱 Cross-Device Excellence**: Perfect iPad Safari compatibility with JavaScript positioning
- **⚡ Pure Static**: Zero dependencies, lightning-fast performance
- **⌨️ Full Accessibility**: Complete keyboard support and responsive design

## 📄 License

MIT License - see LICENSE file for details.
