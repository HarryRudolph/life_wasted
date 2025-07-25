# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple web application called "Life Wasted Visualizer" that calculates and visualizes the cumulative impact of daily time waste. It's a single-page application built with vanilla HTML, CSS, and JavaScript.

## Architecture

- **Frontend-only application**: No backend, build tools, or package management
- **Files**:
  - `index.html`: Main HTML structure with input forms, statistics display, and progress visualization
  - `script.js`: Core JavaScript logic for calculations and animations
  - `style.css`: Complete styling with responsive design and gradient backgrounds

## Development Workflow

Since this is a static web application with no build process:

- **Development**: Open `index.html` directly in a browser or use a simple HTTP server
- **Testing**: Manual testing in browser - no automated test framework
- **No build/lint commands**: Pure vanilla web technologies without tooling

## Key Functionality

The application calculates time waste impact based on:
- Daily wasted hours input (0-16 hours)
- 16 waking hours assumption (8 hours sleep)
- 37-hour work week standard
- Life expectancy calculations with waste ratio adjustments

Main features include real-time calculations, animated progress bars showing normal vs. wasted life progression, and responsive grid layout for statistics display.