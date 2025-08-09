<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Components gallery (settings-like layout with sidebar tabs)
Route::get('components', fn () => Inertia::render('components/buttons'))->name('components.index');
Route::get('components/buttons', fn () => Inertia::render('components/buttons'))->name('components.buttons');
Route::get('components/table', fn () => Inertia::render('components/table'))->name('components.table');
Route::get('components/forms', fn () => Inertia::render('components/forms'))->name('components.forms');
Route::get('components/overlays', fn () => Inertia::render('components/overlays'))->name('components.overlays');
Route::get('components/feedback', fn () => Inertia::render('components/feedback'))->name('components.feedback');


