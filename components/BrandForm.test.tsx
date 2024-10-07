import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BrandForm from '@/components/BrandForm';
import { BrandFormProvider } from '@/contexts/BrandFormContext';

describe('BrandForm', () => {
  it('renders the form and handles submission', () => {
    const mockOnSubmit = jest.fn();
    render(
      <BrandFormProvider>
        <BrandForm onSubmit={mockOnSubmit} />
      </BrandFormProvider>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Brand Name/i), {
      target: { value: 'Test Brand' },
    });
    fireEvent.change(screen.getByLabelText(/Industry/i), {
      target: { value: 'technology' },
    });

    // Move to the next step
    fireEvent.click(screen.getByText(/Next/i));

    // Select archetypes
    fireEvent.change(screen.getByLabelText(/Primary Archetype/i), {
      target: { value: 'The Hero' },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/Generate Brand Identity/i));

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});