import { useAppContext } from "../context/AppContext";
import DataTable from "../components/DataTable";
import { useState } from "react";
import Button from "../components/Button";
import axios from "axios";

const Subject = () => {
	const { subjects, getSubjects } = useAppContext();
	const [showForm, setShowForm] = useState(false);
	const intial = {
		code: "",
		subject: "",
		course: "",
	};
	const [formData, setFormData] = useState(intial);
	const [editing, setEditing] = useState(false);

	const handleEdit = (row) => {
		setFormData({
			id: row.id,
			code: row.code,
			subject: row.subject,
			course: row.course,
		});
		setEditing(true);
		setShowForm(true);
	};

	const handleDelete = (row) => {
		if (window.confirm("Are you sure you want to delete this student?")) {
			deleteSubjects(row.id);
			getSubjects();
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (formData.code && formData.subject && formData.course) {
			if (editing === true) {
				updateSubjects(formData.id);
				getSubjects();
				// Edit existing
			} else {
				// Add new
				addSubjects();
				getSubjects();
			}
		}
		setShowForm(false);
		setFormData(intial);
		setEditing(null);
	};

	const columns = [
		{ key: "id", title: "ID" },
		{ key: "code", title: "Code" },
		{ key: "subject", title: "Subject" },
		{ key: "course", title: "Course" },
	];

	const addSubjects = async () => {
		await axios
			.post("http://localhost:5050/api/addsubject", {
				code: formData.code,
				subject: formData.subject,
				course: formData.course,
			})
			.then((response) => {
				console.log(response.data);
				getSubjects();
				setFormData({ code: "", subject: "", course: "" });
			})
			.catch((error) => {
				console.error("Error creating subject:", error);
			});
	};

	const updateSubjects = async (id) => {
		await axios
			.post(`http://localhost:5050/api/updatesubject/${id}`, {
				code: formData.code,
				subject: formData.subject,
				course: formData.course,
			})
			.then((response) => {
				console.log(response.data);
				getSubjects();
				setFormData({ code: "", subject: "", course: "" });
			})
			.catch((error) => {
				console.error("Error updating subject:", error);
			});
	};

	const deleteSubjects = async (id) => {
		await axios
			.post(`http://localhost:5050/api/deletesubject/${id}`)
			.then((response) => {
				console.log(response.data);
				getSubjects();
				setFormData({ code: "", subject: "", course: "" });
			})
			.catch((error) => {
				console.error("Error deleting subject:", error);
			});
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold mb-6">Subject</h1>
				<Button
					onClick={() => {
						setShowForm(!showForm);
						setFormData(intial);
						setEditing(null);
					}}>
					{showForm ? "Cancel" : "Add Subject"}
				</Button>
			</div>
			{showForm && (
				<div className="mb-6 p-4 border rounded-lg">
					<h2 className="text-lg font-semibold mb-4">
						{editing ? "Edit Subject" : "Add New Subject"}
					</h2>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block mb-2">Code</label>
							<input
								type="text"
								className="w-full p-2 border rounded"
								value={formData.code}
								onChange={(e) =>
									setFormData({
										...formData,
										code: e.target.value,
									})
								}
							/>
						</div>
						<div className="mb-4">
							<label className="block mb-2">Subject</label>
							<input
								type="text"
								className="w-full p-2 border rounded"
								value={formData.subject}
								onChange={(e) =>
									setFormData({
										...formData,
										subject: e.target.value,
									})
								}
							/>
						</div>
						<div className="mb-4">
							<label className="block mb-2">Course</label>
							<input
								type="text"
								className="w-full p-2 border rounded"
								value={formData.course}
								onChange={(e) =>
									setFormData({
										...formData,
										course: e.target.value,
									})
								}
							/>
						</div>
						<Button type="submit">Save</Button>
					</form>
				</div>
			)}
			<DataTable
				data={subjects}
				columns={columns}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
		</div>
	);
};

export default Subject;
