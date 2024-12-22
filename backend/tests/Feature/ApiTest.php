<?php

namespace Tests\Feature;

use App\Models\Channel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_store_creates_channel(): void
    {
        $response = $this->post('/api/add', ['name' => 'Google', 'quantity' => 100]);

        $response->assertJson(['message' => 'Item added successfully']);

        $this->assertDatabaseCount("channels", 1);
        $this->assertDatabaseHas('channels', ['name' => 'Google', 'quantity' => 100]);
    }

    public function test_index_returns_list_of_channels(): void
    {
        Channel::insert([
            ['name' => 'Google', 'quantity' => 100],
            ['name' => 'Facebook', 'quantity' => 200],
        ]);

        $response = $this->get('/api/channels');

        $response->assertJson([
            [
                'name' => 'Google',
                'quantity' => 100,
            ],
            [
                'name' => 'Facebook',
                'quantity' => 200,
            ],
        ]);

        $this->assertDatabaseCount("channels", 2);
    }

    public function test_update_updates_channel(): void
    {
        $channel = Channel::create([
            'name' => 'Google',
            'quantity' => 100,
        ]);

        $response = $this->put('/api/edit/'.$channel->id, ['quantity' => 200]);

        $response->assertJson(['message' => 'Item updated successfully']);

        $this->assertDatabaseHas('channels', ['name' => 'Google', 'quantity' => 200]);
    }

    public function test_destroy_deletes_channel(): void
    {
        $channel = Channel::create([
            'name' => 'Google',
            'quantity' => 100,
        ]);

        $response = $this->delete('/api/delete/'.$channel->id);

        $response->assertJson(['message' => 'Item removed successfully']);

        $this->assertDatabaseEmpty('channels');
    }

    public function test_store_validation(): void 
    {
        $provider = array_merge($this->invalidNamesProvider(), $this->invalidQuantityProvider());

        $channel = Channel::create([
            'name' => 'Google',
            'quantity' => 100,
        ]);

        foreach($provider as $item) {
            $response = $this->post('api/add', $item['data']);
            $response->assertSessionHasErrors($item['error']);
        }
    }

    public function test_update_validation(): void 
    {
        $provider = $this->invalidQuantityProvider();

        foreach($provider as $item) {
            $response = $this->post('api/add', $item['data']);
            $response->assertSessionHasErrors($item['error']);
        }
    }

    private function invalidNamesProvider()
    {
        return [
            [
                'data' => ['name' => '', 'quantity' => 100],
                'error' => ['name' => 'Nazwa jest wymagana.'],
            ],
            [
                'data' => ['name' => 'Google', 'quantity' => 200],
                'error' => ['name' => 'Nazwa już istnieje.'],
            ],
            [
                'data' => ['name' => 100, 'quantity' => 100],
                'error' => ['name' => 'Nazwa musi być tekstem.'],
            ],
        ];
    }

    private function invalidQuantityProvider()
    {
        return [
            [
                'data' => ['quantity' => ''],
                'error' => ['quantity' => 'Ilość jest wymagana.'],
            ],
            [
                'data' => ['quantity' => -5],
                'error' => ['quantity' => 'Ilość nie może być ujemna.'],
            ],
            [
                'data' => ['quantity' => 'asdf'],
                'error' => ['quantity' => 'Ilość musi być liczbą.'],
            ],
        ];
    }
}