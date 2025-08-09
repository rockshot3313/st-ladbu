<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

// Users pages
Route::get('users', function (Request $request) {
    $search = (string) $request->query('search', '');

    $query = User::select('id', 'name', 'email', 'email_verified_at', 'created_at', 'updated_at');

    if ($search !== '') {
        $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        });
    }

    $users = $query
        ->latest('id')
        ->paginate(10)
        ->withQueryString()
        ->through(fn ($u) => [
            'id' => $u->id,
            'name' => $u->name,
            'email' => $u->email,
            'email_verified_at' => $u->email_verified_at,
            'created_at' => $u->created_at,
            'updated_at' => $u->updated_at,
        ]);

    return Inertia::render('users/index', [
        'users' => $users,
        'filters' => [
            'search' => $search,
        ],
    ]);
})->name('users.index');

Route::get('users/{id}', function (int $id) {
    $user = User::select('id', 'name', 'email', 'email_verified_at', 'created_at', 'updated_at')->findOrFail($id);

    return Inertia::render('users/show', [
        'user' => $user,
    ]);
})->name('users.show');

Route::get('users/{id}/edit', function (int $id) {
    $user = User::select('id', 'name', 'email')->findOrFail($id);

    return Inertia::render('users/edit', [
        'user' => $user,
    ]);
})->name('users.edit');

Route::put('users/{user}', function (Request $request, User $user) {
    $validated = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
    ]);

    $user->fill($validated);
    $user->save();

    return redirect()->route('users.show', $user->id);
})->name('users.update');

// Create user
Route::post('users', function (Request $request) {
    $validated = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
    ]);

    $user = new User();
    $user->fill($validated);
    $user->password = Hash::make(Str::random(16));
    $user->save();

    return redirect()->route('users.show', $user->id);
})->name('users.store');

// Delete user
Route::delete('users/{user}', function (User $user) {
    $user->delete();
    return redirect()->route('users.index');
})->name('users.destroy');

// Send password reset link to user
Route::post('users/{user}/password/reset-link', function (User $user) {
    Password::sendResetLink(['email' => $user->email]);
    return back();
})->name('users.password.email');

// Resend verification email for user
Route::post('users/{user}/verification/send', function (User $user) {
    if ($user->hasVerifiedEmail()) {
        return back();
    }
    $user->sendEmailVerificationNotification();
    return back();
})->name('users.verification.send');


