import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
	colorScheme: "light",
	colors: {
		// Custom brand color with shades
		'brand': [
			'#EFF6FF', // 0
			'#DBEAFE', // 1
			'#BFDBFE', // 2
			'#93C5FD', // 3
			'#60A5FA', // 4
			'#3B82F6', // 5 - Primary
			'#2563EB', // 6
			'#1D4ED8', // 7
			'#1E40AF', // 8
			'#1E3A8A', // 9
		],
		primary: ['#ECF3FD', '#D8E7FB', '#B8D3F9', '#93C5FD', '#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF', '#1E3A8A'],
		secondary: ['#DCDDEC', '#D2D4E7', '#C6C8E1', '#ACAFD3', '#7F83B8', '#646AAD', '#4C518F', '#393D6B', '#0C1f56', '#06102B'],
		success: ['#ECFDF5', '#D1FAE5', '#A7F3D0', '#6EE7B7', '#34D399', '#10B981', '#059669', '#047857', '#065F46', '#064E3B'],
		warning: ['#FFFBEB', '#FEF3C7', '#FDE68A', '#FCD34D', '#FBBF24', '#F59E0B', '#D97706', '#B45309', '#92400E', '#78350F'],
		danger: ['#FEF2F2', '#FEE2E2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444', '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D'],
		neutral: ['#FBFBFC', '#EEEFF2', '#DADBE2', '#CBD5E1', '#8D90A7', '#6F728F', '#454966', '#383A4B', '#313038', '#21222C'],
		shades: ['#FFFFFF', '#000000']
	},
	primaryColor: 'brand',
	primaryShade: 5,
	fontFamily: 'Outfit,sans-serif',
	fontFamilyMonospace: 'Monaco, Courier, monospace',
	fontSizes: {
		xs: '12px',
		sm: '14px',
		md: '16px',
		lg: '18px',
		xl: '20px',
	},
	breakpoints: {
		xs: '36em',
		sm: '48em',
		md: '62em',
		lg: '75em',
		xl: '90em',
	},
	radius: {
		xs: '4px',
		sm: '8px',
		md: '12px',
		lg: '16px',
		xl: '24px',
	},
	spacing: {
		xs: '8px',
		sm: '16px',
		md: '24px',
		lg: '32px',
		xl: '48px',
	},
	shadows: {
		xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
		sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
		md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
		lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
		xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
	},
	headings: {
		fontFamily: 'Outfit,sans-serif',
		fontWeight: 600,
		sizes: {
			h1: { fontSize: '2rem', lineHeight: 1.2 },
			h2: { fontSize: '1.8rem', lineHeight: 1.2 },
			h3: { fontSize: '1.5rem', lineHeight: 1.3 },
			h4: { fontSize: '1.3rem', lineHeight: 1.4 },
			h5: { fontSize: '1.125rem', lineHeight: 1.5 },
			h6: { fontSize: '1rem', lineHeight: 1.5 },
		},
	},
	components: {
		TextInput: {
			styles: {
				label: {
					fontSize: '1rem',
					color: '#DCE7FCFF',
				},
				input: {
					borderRadius: '2rem !important',
					backgroundColor: '#DCE7FCFF',
				}
			}
		},
		Select: {
			styles: {
				label: {
					fontSize: '1rem',
					color: '#DCE7FCFF',
				},
				input: {
					borderRadius: '2rem !important',
					backgroundColor: '#DCE7FCFF',
				}
			}
		},
		BackgroundImage: {
			styles: {
				root: {
					img: {
						filter: "blur(12px)"
					}
				}
			}
		},
		header: {
			styles: {
				root: {
					backgroundColor: '#FFFFFF',
				}
			}
		},
		Button: {
			defaultProps: {
				radius: 'md',
			},
			styles: {
				root: {
					fontWeight: 500,
				},
			},
		},
		Card: {
			defaultProps: {
				shadow: 'sm',
				radius: 'md',
				p: 'lg',
			},
		},
		Paper: {
			defaultProps: {
				shadow: 'sm',
				radius: 'md',
				p: 'md',
			},
		},
		Title: {
			styles: (theme) => ({
				root: {
					'&:is(h1)': {
						fontSize: '2rem',
						marginBottom: theme.spacing.md,
					},
					'&:is(h2)': {
						fontSize: '1.75rem',
						marginBottom: theme.spacing.sm,
					},
					'&:is(h3)': {
						fontSize: '1.5rem',
						marginBottom: theme.spacing.sm,
					},
				},
			}),
		},
	},
}
