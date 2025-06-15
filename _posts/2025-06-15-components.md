---
layout: post
title: "Components"
date: 2025-06-15 21:30
tags: [typography, design, styleguide]
categories: [blogging, components]
excerpt: This post is a comprehensive test of various components. It includes alerts, buttons, and more.
---

## Alerts

### Alert with Icon, Heading & Dismiss

<div class="alert alert-success">
  <div class="alert-icon">
    ✅
  </div>
  <div class="alert-content">
    <h4 class="alert-heading">Success!</h4>
    Your profile has been updated successfully.
  </div>
  <button class="alert-dismiss" aria-label="Close" data-tooltip="Close"></button>
</div>

### Alert with Only Text

<div class="alert alert-danger">
  <div class="alert-content">
    Failed to save your changes. Please try again.
  </div>
</div>

### Alert with SVG Icon

<div class="alert alert-attention">
  <div class="alert-icon">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2L2 22h20L12 2zM12 16v-4h1v4h-1zm0 4v-2h1v2h-1z"/>
    </svg>
  </div>
  <div class="alert-content">
    <h4 class="alert-heading">Attention</h4>
    This action requires confirmation.
  </div>
</div>

### Alert with Link

<div class="alert alert-accent">
  <div class="alert-icon">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2L2 22h20L12 2zM12 16v-4h1v4h-1zm0 4v-2h1v2h-1z" />
    </svg>
  </div>
  <div class="alert-content">
    <h4 class="alert-heading">Heads Up!</h4>
    This is an <a href="#">important notification</a> that requires your attention.
    You can <a href="/settings">update your settings here</a>.
    An example showing the <code class="language-plaintext highlighter-rouge">warning</code> type prompt.
  </div>
  <button class="alert-dismiss" aria-label="Close" data-tooltip="Close"></button>
</div>
