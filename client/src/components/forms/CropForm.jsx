"use client"
import { Button, Paper, Stack, TextField, Typography, MenuItem, Box } from "@mui/material";
import { useEffect, useState } from "react";

const CropForm = ({ dataSendingHandler, initialData, labelButton, labelTitle }) => {
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dataSendingHandler(formData);
        setFormData(initialData);
    };

    return (
        <Paper elevation={2} sx={{ padding: 2, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
                {labelTitle}
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Box sx={{ display: "flex", gap: "1rem" }}>
                    
                    <Stack spacing={2} direction="column">
                        <TextField
                            name="product"
                            label="Cultivo"
                            variant="outlined"
                            value={formData.product}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            name="category"
                            select
                            label="Tipo de Cultivo"
                            variant="outlined"
                            value={formData.category}
                            onChange={handleChange}
                            fullWidth
                        >
                            {["Frutas", "Verduras", "Granos"].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                    </Stack>

                    <Stack spacing={2} direction="column">
                        <TextField
                            name="sowingDate"
                            label="Fecha de Siembra"
                            variant="outlined"
                            type="date"
                            value={formData.sowingDate}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    
                        <TextField
                            name="cultivationMethod"
                            label="Método de Cultivo"
                            variant="outlined"
                            value={formData.cultivationMethod}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Stack>

                </Box>
                <Box>
                    <Button type="submit" variant="contained" color="primary">
                        {labelButton}
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default CropForm;
