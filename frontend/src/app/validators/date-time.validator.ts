import type { AbstractControl, ValidatorFn } from "@angular/forms";

export function dateTimeValidator(): ValidatorFn {
	return (control: AbstractControl): { [key: string]: unknown } | null => {
		const isValidFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(control.value);
		if (!isValidFormat) {
			return { invalidDateTime: { value: control.value } };
		}

		const [datePart, timePart] = control.value.split("T");
		const [year, month, day] = datePart
			.split("-")
			.map((num: string) => Number.parseInt(num, 10));
		const [hour, minute] = timePart
			.split(":")
			.map((num: string) => Number.parseInt(num, 10));
		const date = new Date(year, month - 1, day, hour, minute);

		const isValidDate =
			date.getFullYear() === year &&
			date.getMonth() === month - 1 &&
			date.getDate() === day &&
			date.getHours() === hour &&
			date.getMinutes() === minute;

		return isValidDate ? null : { invalidDateTime: { value: control.value } };
	};
}
