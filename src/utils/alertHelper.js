import Swal from 'sweetalert2';

export const showAlert = (icon, title, text) => {
	Swal.fire({
		icon,
		title,
		text,
	});
};
